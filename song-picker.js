const SONGS_URL = './songs.json';

const FALLBACK_SONGS = [
    { id: "6rv4gfOtrlYFrcu03gZkUW", title: "I Follow You", artist: "Melody's Echo Chamber" },
    { id: "2mWfVxEo4xZYDaz0v7hYrN", title: "Juna", artist: "Clairo"},
    { id: '2LD2gT7gwAurzdQDQtILds', title: 'Veridis Quo', artist: 'Daft Punk' },
    { id: '28Ymf40EoJ6776juQZNPoY', title: 'All They Wanted', artist: 'Panchiko' },
];

function extractTrackId(value) {
    if (typeof value !== 'string') return '';

    const match = value.match(/track\/([A-Za-z0-9]+)/);
    return match ? match[1] : value.trim();
}

function normalizeSong(entry) {
    if (typeof entry === 'string') {
        const id = extractTrackId(entry);
        return id ? { id, title: '', artist: '' } : null;
    }

    if (entry && typeof entry === 'object') {
        const id = extractTrackId(entry.id ?? entry.url ?? '');
        if (!id) return null;

        return {
            id,
            title: typeof entry.title === 'string' ? entry.title : '',
            artist: typeof entry.artist === 'string' ? entry.artist : ''
        };
    }

    return null;
}

async function loadSongs() {
    try {
        const response = await fetch(SONGS_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Expected an array of songs');

        const songs = data.map(normalizeSong).filter(Boolean);
        if (songs.length === 0) throw new Error('No valid songs found');

        return songs;
    } catch (error) {
        console.warn('Could not load songs.json, using bundled fallback:', error);
        return FALLBACK_SONGS;
    }
}

function pickRandomSong(songs) {
    return songs[Math.floor(Math.random() * songs.length)];
}

function renderPlayer(song) {
    const container = document.getElementById('spotifyPlayer');
    if (!container) return;

    const iframe = document.createElement('iframe');
    iframe.id = 'spotifyIframe';
    iframe.title = song.title && song.artist
        ? `Spotify player: ${song.title} by ${song.artist}`
        : 'Random song from my Spotify playlist';
    iframe.src = `https://open.spotify.com/embed/track/${song.id}`;
    iframe.height = '152';
    iframe.width = '100%';
    iframe.frameBorder = '0';
    iframe.loading = 'lazy';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;';

    container.appendChild(iframe);
}

async function initSpotifyPlayer() {
    const songs = await loadSongs();
    renderPlayer(pickRandomSong(songs));
}

initSpotifyPlayer();
