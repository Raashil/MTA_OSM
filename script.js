// Initialize the map centered on New York City
const map = L.map('map').setView([40.7128, -74.0060], 13);

// Add transit map style tiles
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    style: 'transit'
}).addTo(map);

// Store markers for search functionality
const stationMarkers = {};

// Add markers for each station
stations.forEach(station => {
    const marker = L.circleMarker(station.coordinates, {
        radius: 6,
        fillColor: '#fff',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
    }).addTo(map)
    .bindPopup(`
        <b>${station.name}</b><br>
        Lines: ${station.lines.join(', ')}<br>
        <a href="#" class="ppt-link" data-station="${station.name}">PPT</a>
    `);

    // Store marker for search
    stationMarkers[station.name] = marker;

    marker.on('click', () => {
        showStationInfo(station);
    });

    // Add click event for PPT link
    marker.on('popupopen', () => {
        const pptLink = document.querySelector(`.ppt-link[data-station="${station.name}"]`);
        if (pptLink) {
            pptLink.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`PPT clicked for ${station.name}`);
            });
        }
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