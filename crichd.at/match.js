document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const matchId = params.get('id');
    
    if (!matchId) {
        window.location.href = 'index.html';
        return;
    }

    const match = window.matches.find(m => m.id === matchId);
    if (!match) {
        window.location.href = 'index.html';
        return;
    }

    renderMatchDetails(match);
});

function renderMatchDetails(match) {
    document.title = `${match.title} - CricHD`;
    
    const matchInfo = document.querySelector('.match-info');
    const streamContainer = document.querySelector('.stream-container');

    // Update match information
    matchInfo.innerHTML = `
        <div class="match-header-large">
            ${match.leagueLogo ? `<img src="${match.leagueLogo}" alt="${match.league}" class="league-logo-large">` : ''}
            <h1>${match.title}</h1>
        </div>
        <div class="match-meta">
            <p class="venue"><i class="fas fa-map-marker-alt"></i> ${match.venue}</p>
            <p class="description">${match.description}</p>
        </div>
        ${match.teams ? `
        <div class="teams-large">
            <div class="team-large">
                <img src="${match.teams.team1.flag}" alt="${match.teams.team1.name}" class="team-flag-large">
                <h2>${match.teams.team1.name}</h2>
            </div>
            <div class="vs">VS</div>
            <div class="team-large">
                <img src="${match.teams.team2.flag}" alt="${match.teams.team2.name}" class="team-flag-large">
                <h2>${match.teams.team2.name}</h2>
            </div>
        </div>
        ` : ''}
    `;

    // Update stream links
    streamContainer.innerHTML = `
        <h2>Available Streams</h2>
        <div class="stream-links">
            ${match.streamLinks.map(stream => `
                <a href="${stream.url}" class="stream-link" target="_blank">
                    <span class="stream-name">${stream.name}</span>
                    <span class="stream-quality">${stream.quality}</span>
                </a>
            `).join('')}
        </div>
    `;
}