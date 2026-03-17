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
    '6G7rDUqMhnmXFVwRRQ7azu', '28Ymf40EoJ6776juQZNPoY'
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