// Each String represents an ID for a Spotify song
const trackURLs = [
    '5FI0R5JDimbYBMbMCGhWYV', '5rrZt4Zk2XCaJsjjgQXzpm', '2ZWlPOoWh0626oTaHrnl2a', 
    '4xlpJ99yL9xYQtzG6c3hwk', '6gSalwEvVQfSFiqgwfyITp', '0HAqq2GcQKyi3s87GuN7jU', 
    '2gKKDFCyubF1TSiC31yIlG', '2mWfVxEo4xZYDaz0v7hYrN', '2LD2gT7gwAurzdQDQtILds', 
    '1i84eCrJbu0EIP5aWToMMa', '5S8jc9sCle880PjbwnEzsY', '0WbMK4wrZ1wFSty9F7FCgu', 
    '5NtszEfzW6JPcTbIjqfQ5l', '3NzGv0zcCwp58mkpybRtwY', '4vjvx7Zxkb4AltGcZ0BBvI', 
    '3HcqlbDWuf1PvFcppLMQhK', '0FYIBXiwSOVfoDNpnIHqCs', '7jJzJXyWimbqGObhwNwQBw', 
    '2LMloFiV7DHpBhITOaBSam', '04zePsjItzOMTINRMIsdwR', '2bXR3wHjJ7zBZ7RRuTVCvQ', 
    '21iSFtrC2VHP3PfImVTglV', '67zeo1agxC7EF2yeKjgJWw', '4uVLHKDWlYyz1ZUdAMGU0K', 
    '54Bs34vTza8CqQuwY6rcg9', '2rUaktaAxshyPzIdAKzk1Y', '1AAYbsAIgEJMbxgLgpjE9y', 
    '60pbRwtQ2b7RYGDnfUGqPP', '7bKkIsUZ6sb5Lt73oNTLUw', '2CaoAtgLUm2BarIiZrQslN', 
    '7Bv26qd7JX525wGCmhrPtj', '5ruzrDWcT0vuJIOMW7gMnW', '2teH8BAM9q2oSmBre5hiQM', 
    '4B1HsOydP0Kq94uX2oxVjT', '3EAUSlUzVTLhxLn8Fhpz5V', '4VYNZbmI3ixv9mlTTd9NKc', 
    '7wAhg1bclLYzOjAn2eCxPz', '7rbECVPkY5UODxoOUVKZnA', '2KylN9C0wNbzLgZNTG9oiU', 
    '2niQHvviKRUaJNgxwpLklM', '4kOy7M6eT5kYJCZxh0c6Lh', '6rv4gfOtrlYFrcu03gZkUW', 
    '6G7rDUqMhnmXFVwRRQ7azu', '28Ymf40EoJ6776juQZNPoY', '51wxtCuipwjvvT99wsSmCc',
    '1Qth3TmxzsBYDpCRCffdZk', '4k65ndzxH3tHYZSnYurgM7', '1YQ3pFxIi3vJ7C5XEsVRVH',
    '6loJHm0hdjgNYB10uiY2aD', '0UPoWqgAcq5Og8PVj61x4S2', '2FXyHAkNkIym2sZVRuJuTd',
    '1ZxakFiRaOFj6CDarCxozU', '5CRPGdCSOfstyTVK9Ja5EQ', '2VhJ4nrPorAbySEgO4V0BS',
    '07OBZERYeI2DndhZw2S8lc', '6dNk7wme2WgW7Sd6lYcCbL', '4wEuNvb7oG8oZYrZPZ9rPr', 
    '3sslYZcFKtUvIEWN9lADgr', '4CwGmNXIrcp04sjG3pajXY', '1hz7SRTGUNAtIQ46qiNv2p', 
    '5qspeKX1xBacLJMm2t3Yc0', '1YV3dVis0GURVM6pgLAQcG', '3j5yWdZ1Hri1nXHoYSYmmu',
    '4UI2AbJT7LOyEwNzsfKv7n', '0DP6bKaC72kf3mO3EuAYBO', '3HfEgAaf0koxBpBB8NvGda', 
    '3jjsRKEsF42ccXf8kWR3nu', '0dcu28YT8cXZH7JTIraszp', '0R8P9KfGJCDULmlEoBagcO',
    '5C54HfgwmX7Er7FBDhdz1E', '2ZwToUy7ZKvBBN2ik7kK0p', '5Zk0IqQrbxjFQyxKHaAcqO', 
    '54CNkUBOgVZ5M5y9eL8xhg', '7xI45uLWPt5U7z1M8p7ZvK', '287s8n6XNYnQHIRuZjYRhS',
    '26kfheN3SyAwXajPXUXU09'
];

function getRandomTrack() {
    const index = Math.floor(Math.random() * trackURLs.length);
    return trackURLs[index];
}

trackID = getRandomTrack();

const iframe = document.createElement("iframe");
iframe.src = `https://open.spotify.com/embed/track/${trackID}`;
iframe.height = "152";
iframe.width = "100%";
iframe.frameBorder = "0";
iframe.loading = "lazy";
iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;"

document.getElementById("spotifyPlayer").appendChild(iframe);