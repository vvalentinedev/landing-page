#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_FILE = resolve(SCRIPT_DIR, '..', 'songs.json');
const CONCURRENCY = 5;
const MAX_ATTEMPTS = 3;

function parseArgs(argv) {
    const args = { refresh: false, file: DEFAULT_FILE, input: null };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];

        if (arg === '--refresh') {
            args.refresh = true;
        } else if (arg === '--file' || arg === '--input') {
            const value = argv[++i];
            if (!value) throw new Error(`${arg} requires a path`);
            if (arg === '--input') args.input = resolve(value);
            else args.file = resolve(value);
        } else {
            throw new Error(`Unknown argument: ${arg}`);
        }
    }

    return args;
}

function extractTrackId(value) {
    if (typeof value !== 'string') return '';

    const match = value.match(/track\/([A-Za-z0-9]+)/);
    return match ? match[1] : value.trim();
}

function toEntry(item) {
    if (typeof item === 'string') return { id: extractTrackId(item), title: '', artist: '' };

    if (item && typeof item === 'object') {
        return {
            id: extractTrackId(item.id ?? item.url ?? ''),
            title: typeof item.title === 'string' ? item.title : '',
            artist: typeof item.artist === 'string' ? item.artist : '',
        };
    }

    return { id: '', title: '', artist: '' };
}

function extractJsonObject(text, key) {
    const marker = `"${key}":`;
    const markerIndex = text.indexOf(marker);
    if (markerIndex === -1) return null;

    let start = markerIndex + marker.length;
    while (start < text.length && text[start] !== '{') start++;
    if (start >= text.length) return null;

    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = start; i < text.length; i++) {
        const char = text[i];

        if (inString) {
            if (escaped) escaped = false;
            else if (char === '\\') escaped = true;
            else if (char === '"') inString = false;
        } else if (char === '"') {
            inString = true;
        } else if (char === '{') {
            depth++;
        } else if (char === '}') {
            depth--;
            if (depth === 0) {
                try {
                    return JSON.parse(text.slice(start, i + 1));
                } catch {
                    return null;
                }
            }
        }
    }

    return null;
}

async function fetchMetadata(id, attempt = 1) {
    try {
        const response = await fetch(`https://open.spotify.com/embed/track/${id}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; song-picker-generator/1.0)' },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const entity = extractJsonObject(await response.text(), 'entity');
        if (!entity) throw new Error('Could not find track metadata');

        return {
            title: entity.title || entity.name || '',
            artist: Array.isArray(entity.artists)
                ? entity.artists.map(artist => artist.name).filter(Boolean).join(', ')
                : '',
        };
    } catch (error) {
        if (attempt >= MAX_ATTEMPTS) throw error;
        await new Promise(resolve => setTimeout(resolve, attempt * 1000));
        return fetchMetadata(id, attempt + 1);
    }
}

async function readInput(file) {
    const raw = await readFile(file, 'utf8');

    if (file.endsWith('.json')) {
        const data = JSON.parse(raw);
        if (!Array.isArray(data)) throw new Error('Input JSON must be an array');
        return data.map(toEntry);
    }

    return raw
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
        .map(toEntry);
}

async function runWithConcurrency(items, limit, worker) {
    let index = 0;

    const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (index < items.length) {
            const current = index++;
            await worker(items[current], current);
        }
    });

    await Promise.all(runners);
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const inputFile = args.input ?? args.file;

    let entries;
    try {
        entries = await readInput(inputFile);
    } catch (error) {
        if (error.code === 'ENOENT' && !args.input) {
            throw new Error(`No songs file found at ${inputFile}. Pass --input <file> to bootstrap one.`);
        }
        throw error;
    }

    const seen = new Set();
    const songs = [];

    for (const entry of entries) {
        if (!entry.id || seen.has(entry.id)) continue;
        seen.add(entry.id);
        songs.push(entry);
    }

    let fetched = 0;
    let failed = 0;

    await runWithConcurrency(songs, CONCURRENCY, async (song, index) => {
        if (!args.refresh && song.title && song.artist) return;

        try {
            const metadata = await fetchMetadata(song.id);
            songs[index] = { id: song.id, ...metadata };
            fetched++;
            console.log(`[${fetched + failed}/${songs.length}] ${song.id} -> ${metadata.title} — ${metadata.artist}`);
        } catch (error) {
            failed++;
            console.warn(`[${fetched + failed}/${songs.length}] ${song.id} -> failed: ${error.message}`);
        }
    });

    await writeFile(args.file, `${JSON.stringify(songs, null, 2)}\n`, 'utf8');

    console.log(`\nWrote ${songs.length} songs to ${args.file} (fetched ${fetched}, failed ${failed}).`);
    if (failed > 0) process.exitCode = 1;
}

main().catch(error => {
    console.error(error.message);
    process.exit(1);
});
