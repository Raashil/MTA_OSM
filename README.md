# MTA OpenStreetMap Visualization

A web-based visualization of the New York City subway system using OpenStreetMap data. This project displays subway stations, their connections, and provides an interactive interface for exploring the MTA subway network.

## Features

- Interactive map showing all NYC subway stations
- Transit map style with colored subway lines
- Station markers with popup information
- Search functionality to find specific stations
- Floating banner with project information
- Responsive design that works on both desktop and mobile devices

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Leaflet.js for map visualization
- OpenStreetMap for base map data
- MTA GTFS data for subway information

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd MTA_OSM
```

2. Open the project in your preferred code editor

3. Launch the project using a local server. You can use Python's built-in server:
```bash
python -m http.server 8000
```
Or use any other local development server of your choice.

4. Open your web browser and navigate to:
```
http://localhost:8000
```

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles for the application
- `script.js` - JavaScript code for map functionality and interactivity
- `README.md` - Project documentation

## Features in Detail

### Map Visualization
- Custom styled map focusing on subway infrastructure
- Colored subway lines matching MTA's official colors
- Station markers with popup information

### Search Functionality
- Real-time station search
- Autocomplete suggestions
- Quick navigation to selected stations

### Interactive Elements
- Clickable station markers
- Information popups with station details
- Smooth animations and transitions

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Acknowledgments

- OpenStreetMap for providing the base map data
- MTA for subway information
- Leaflet.js for the mapping library 