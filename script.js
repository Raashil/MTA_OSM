// Initialize the map centered on New York City
const map = L.map('map', {
    maxBounds: [
        [40.45, -74.1], // Southwest coordinates
        [40.95, -73.7]  // Northeast coordinates
    ],
    maxBoundsViscosity: 1.0 // Prevents panning outside bounds
}).setView([40.7128, -74.0060], 11);

// Add transit map style tiles
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    minZoom: 10,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    style: 'transit'
}).addTo(map);

// Color mapping for subway lines
const lineColors = {
    '1': '#EE352E', // Red
    '2': '#EE352E', // Red
    '3': '#EE352E', // Red
    '4': '#00933C', // Green
    '5': '#00933C', // Green
    '6': '#00933C', // Green
    '7': '#B933AD', // Purple
    'A': '#0039A6', // Blue
    'B': '#FF6319', // Orange
    'C': '#0039A6', // Blue
    'D': '#FF6319', // Orange
    'E': '#0039A6', // Blue
    'F': '#FF6319', // Orange
    'G': '#6CBE45', // Light Green
    'J': '#996633', // Brown
    'L': '#A7A9AC', // Grey
    'M': '#FF6319', // Orange
    'N': '#FCCC0A', // Yellow
    'Q': '#FCCC0A', // Yellow
    'R': '#FCCC0A', // Yellow
    'S': '#808183', // Grey
    'W': '#FCCC0A', // Yellow
    'Z': '#996633', // Brown
    'SIR': '#002D72' // Staten Island Railway Blue
};

// Store markers for search functionality
const stationMarkers = {};

// Add markers for each station
stations.forEach(station => {
    // Get the first line color for the station
    const firstLine = station.lines[0];
    const lineColor = lineColors[firstLine] || '#000000';

    const marker = L.circleMarker(station.coordinates, {
        radius: 6,
        fillColor: lineColor,
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
    }).addTo(map)
    .bindPopup(`
        <b>${station.name}</b><br>
        Lines: ${station.lines.join(', ')}<br>
        <a href="${station.pptLink}" class="ppt-button" target="_blank">
            <i class="fas fa-file-powerpoint"></i>View PPT
        </a>
    `);

    // Store marker for search
    stationMarkers[station.name] = marker;

    marker.on('click', () => {
        showStationInfo(station);
    });
});

// Function to show station information
function showStationInfo(station) {
    const infoPanel = document.getElementById('station-info');
    const stationName = document.getElementById('station-name');
    const stationDescription = document.getElementById('station-description');

    stationName.textContent = station.name;
    stationDescription.textContent = station.description;
    infoPanel.classList.remove('hidden');
}

// Close button functionality
document.getElementById('close-info').addEventListener('click', () => {
    document.getElementById('station-info').classList.add('hidden');
});

// Search functionality
const searchInput = document.getElementById('station-search');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    searchResults.innerHTML = '';
    
    if (searchTerm.length < 2) {
        searchResults.style.display = 'none';
        return;
    }

    const matches = stations.filter(station => 
        station.name.toLowerCase().includes(searchTerm)
    );

    if (matches.length > 0) {
        searchResults.style.display = 'block';
        matches.forEach(station => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.textContent = station.name;
            div.addEventListener('click', () => {
                const marker = stationMarkers[station.name];
                map.setView(station.coordinates, 15);
                marker.openPopup();
                searchResults.style.display = 'none';
                searchInput.value = '';
            });
            searchResults.appendChild(div);
        });
    } else {
        searchResults.style.display = 'none';
    }
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
}); 