// Add this function at the beginning of your script.js file
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}

// Modified fetchMatchData function to fetch from an API
async function fetchMatchData() {
    try {
        // Replace 'YOUR_API_URL' with your actual API URL
        const response = await fetch('https://match-api.github.io/api/matchapi.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Assuming the API returns match data in JSON format
        const matchData = await response.json();
        return matchData; // Return the fetched data
        
    } catch (error) {
        console.error('Error fetching match data:', error);
        return []; // Return an empty array in case of an error
    }
}

// Sample match data with streaming links (Static fallback if API fails)
const matches = [
    {
        id: 'bpl2024-01',
        league: 'BPL',
        title: 'Bangladesh Premier League',
        subtitle: 'BPL T20',
        startTime: '2025-02-06T14:00:00',
        endTime: '2025-02-15T18:00:00',
        leagueLogo: 'https://bplt20.com.bd/extra-images/bpl-logo.png',
        description: 'Bangladesh Premier League 2024 - Qualifier 1',
        venue: 'Shere Bangla National Stadium, Dhaka',
        streamLinks: [
            { name: 'Stream 1 HD', quality: '1080p', url: '#' },
            { name: 'Stream 2 HD', quality: '720p', url: '#' },
            { name: 'Stream 3', quality: '480p', url: '#' },
            { name: 'Mobile Stream', quality: '360p', url: '#' }
        ]
    },
    {
        id: 'ilt20-2024-01',
        league: 'ILT20',
        title: 'International League T20',
        subtitle: 'IL T20',
        startTime: '2024-02-15T15:30:00',
        endTime: '2024-02-15T19:30:00',
        leagueLogo: 'https://upload.wikimedia.org/wikipedia/en/d/dc/ILT20_logo.jpeg',
        description: 'International League T20 2024 - Final',
        venue: 'Dubai International Stadium',
        streamLinks: [
            { name: 'Stream 1 HD', quality: '1080p', url: '#' },
            { name: 'Stream 2 HD', quality: '720p', url: '#' },
            { name: 'Stream 3', quality: '480p', url: '#' },
            { name: 'Mobile Stream', quality: '360p', url: '#' }
        ]
    },
    {
        id: 'int-aus-sl-2024',
        league: 'CRICKET',
        title: 'Australia vs Sri Lanka',
        teams: {
            team1: { 
                name: 'Australia', 
                flag: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg'
            },
            team2: { 
                name: 'Sri Lanka', 
                flag: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg'
            }
        },
        startTime: '2024-02-15T14:00:00',
        endTime: '2024-02-15T22:00:00',
        description: 'T20I Series 2024 - Match 1',
        venue: 'Melbourne Cricket Ground',
        streamLinks: [
            { name: 'Stream 1 HD', quality: '1080p', url: '#' },
            { name: 'Stream 2 HD', quality: '720p', url: '#' },
            { name: 'Stream 3', quality: '480p', url: '#' },
            { name: 'Mobile Stream', quality: '360p', url: '#' }
        ]
    },
    {
        id: 'ind-eng-2024',
        league: 'CRICKET',
        title: 'India vs England',
        teams: {
            team1: { 
                name: 'India', 
                flag: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg'
            },
            team2: { 
                name: 'England', 
                flag: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_England.svg'
            }
        },
        startTime: '2024-02-15T16:30:00',
        endTime: '2024-02-15T23:30:00',
        description: 'Test Series 2024 - 3rd Test',
        venue: 'Eden Gardens, Kolkata',
        streamLinks: [
            { name: 'Stream 1 HD', quality: '1080p', url: '#' },
            { name: 'Stream 2 HD', quality: '720p', url: '#' },
            { name: 'Stream 3', quality: '480p', url: '#' },
            { name: 'Mobile Stream', quality: '360p', url: '#' }
        ]
    }
];

// Other functions for creating match cards and updating statuses
function createMatchCard(match) {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.setAttribute('data-match-id', match.id);
    
    const header = document.createElement('div');
    header.className = 'match-header';

    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';

    if (match.leagueLogo) {
        const logo = document.createElement('img');
        logo.src = match.leagueLogo;
        logo.className = 'league-logo';
        logo.alt = match.league;
        titleContainer.appendChild(logo);
    }

    const title = document.createElement('div');
    title.className = 'match-title';
    title.textContent = match.title;
    titleContainer.appendChild(title);

    const status = document.createElement('div');
    status.className = 'countdown-badge';
    
    // Check match status and update badge
    updateMatchStatus(status, match);

    header.appendChild(titleContainer);
    header.appendChild(status);
    card.appendChild(header);

    if (match.teams) {
        const teamsDiv = document.createElement('div');
        teamsDiv.className = 'match-teams';

        const team1 = createTeamElement(match.teams.team1);
        const team2 = createTeamElement(match.teams.team2);

        teamsDiv.appendChild(team1);
        teamsDiv.appendChild(team2);
        card.appendChild(teamsDiv);
    }

    // Add click event listener
    card.addEventListener('click', () => {
        window.location.href = `match.html?id=${match.id}`;
    });

    return card;
}

function createTeamElement(team) {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'team';

    const flag = document.createElement('img');
    flag.src = team.flag;
    flag.alt = team.name;
    flag.className = 'team-flag';

    const name = document.createElement('span');
    name.textContent = team.name;

    teamDiv.appendChild(flag);
    teamDiv.appendChild(name);

    return teamDiv;
}

function updateMatchStatus(element, match) {
    const now = new Date().getTime();
    const startTime = new Date(match.startTime).getTime();
    const endTime = new Date(match.endTime).getTime();

    function updateStatus() {
        const currentTime = new Date().getTime();

        if (currentTime < startTime) {
            // Match hasn't started yet
            const distance = startTime - currentTime;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            element.className = 'countdown-badge';
            element.textContent = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            
            // Continue countdown
            setTimeout(updateStatus, 1000);
        } else if (currentTime >= startTime && currentTime <= endTime) {
            // Match is live
            element.className = 'live-badge animate-live';
            element.textContent = 'Live Now!';
        } else {
            // Match has ended
            element.className = 'countdown-badge';
            element.textContent = 'Ended';
        }
    }

    updateStatus();
}

function filterMatches(matches, filterType, filterValue) {
    if (filterType === 'league') {
        return matches.filter(match => match.league === filterValue);
    } else if (filterType === 'team') {
        return matches.filter(match => 
            match.teams && 
            (match.teams.team1.name === filterValue || match.teams.team2.name === filterValue)
        );
    }
    return matches;
}

function clearMatchesContainer() {
    const container = document.getElementById('matchesContainer');
    if (container) {
        container.innerHTML = '';
    }
}

function updateActiveNavLink(league) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-links li').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the clicked nav link
    const activeLink = document.querySelector(`.nav-links li[data-league="${league}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

async function displayMatches(filterType = null, filterValue = null) {
    const container = document.getElementById('matchesContainer');
    if (container) {
        const matchData = await fetchMatchData(); // Fetch match data from API
        const filteredMatches = filterType ? filterMatches(matchData, filterType, filterValue) : matchData;
        
        clearMatchesContainer();
        
        if (filteredMatches.length === 0) {
            container.innerHTML = '<div class="no-matches">No matches found</div>';
            return;
        }

        filteredMatches.forEach(match => {
            container.appendChild(createMatchCard(match));
        });
    }
}

// Initialize the matches when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize matches
    displayMatches();

    // Add click handlers for navbar links
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            const navItem = e.target.closest('li');
            if (navItem) {
                const league = navItem.getAttribute('data-league');
                if (league) {
                    updateActiveNavLink(league);
                    displayMatches('league', league);
                }
            }
        });
    }

    // Add click handlers for leagues
    const leaguesList = document.querySelector('.leagues-list');
    if (leaguesList) {
        leaguesList.addEventListener('click', (e) => {
            const leagueItem = e.target.closest('li');
            if (leagueItem) {
                const leagueName = leagueItem.textContent.trim();
                updateActiveNavLink(leagueName);
                displayMatches('league', leagueName);
            }
        });
    }

    // Add click handlers for teams
    const teamsList = document.querySelector('.teams-list');
    if (teamsList) {
        teamsList.addEventListener('click', (e) => {
            const teamItem = e.target.closest('li');
            if (teamItem) {
                const teamName = teamItem.textContent.trim();
                displayMatches('team', teamName);
            }
        });
    }
});

// Export for use in match.js
window.matches = matches;
