// Application State
let appState = {
    currentUser: null,
    healthProfile: null,
    selectedCity: null,
    currentLocation: 'New York',
    currentWeather: null,
    currentAQI: null,
    theme: 'light',
    map: null,
    markers: [],
    currentMapLayer: 'dark',
    isFullscreen: false
};

// Enhanced Mock Data with North American Cities
const mockData = {
    aqiColors: {
        good: {range: "0-50", color: "#00e400", label: "Good"},
        moderate: {range: "51-100", color: "#ffff00", label: "Moderate"},
        unhealthySensitive: {range: "101-150", color: "#ff7e00", label: "Unhealthy for Sensitive Groups"},
        unhealthy: {range: "151-200", color: "#ff0000", label: "Unhealthy"},
        veryUnhealthy: {range: "201-300", color: "#8f3f97", label: "Very Unhealthy"},
        hazardous: {range: "301+", color: "#7e0023", label: "Hazardous"}
    },
    cities: [
        {name: "New York", lat: 40.7128, lng: -74.0060, aqi: 89, dominant: "PM2.5", pollutants: {pm25: 32, pm10: 45, o3: 75, no2: 28, so2: 12, co: 1.1}},
        {name: "Los Angeles", lat: 34.0522, lng: -118.2437, aqi: 152, dominant: "O3", pollutants: {pm25: 55, pm10: 72, o3: 152, no2: 45, so2: 8, co: 2.1}},
        {name: "Chicago", lat: 41.8781, lng: -87.6298, aqi: 76, dominant: "PM2.5", pollutants: {pm25: 28, pm10: 38, o3: 65, no2: 32, so2: 15, co: 1.3}},
        {name: "Toronto", lat: 43.6532, lng: -79.3832, aqi: 65, dominant: "PM10", pollutants: {pm25: 22, pm10: 65, o3: 58, no2: 25, so2: 10, co: 0.9}},
        {name: "Mexico City", lat: 19.4326, lng: -99.1332, aqi: 185, dominant: "PM2.5", pollutants: {pm25: 95, pm10: 125, o3: 88, no2: 65, so2: 25, co: 3.2}},
        {name: "Vancouver", lat: 49.2827, lng: -123.1207, aqi: 42, dominant: "PM10", pollutants: {pm25: 15, pm10: 42, o3: 45, no2: 18, so2: 6, co: 0.7}},
        {name: "Miami", lat: 25.7617, lng: -80.1918, aqi: 95, dominant: "O3", pollutants: {pm25: 35, pm10: 48, o3: 95, no2: 22, so2: 8, co: 1.0}},
        {name: "Denver", lat: 39.7392, lng: -104.9903, aqi: 112, dominant: "O3", pollutants: {pm25: 38, pm10: 52, o3: 112, no2: 35, so2: 12, co: 1.5}},
        {name: "Seattle", lat: 47.6062, lng: -122.3321, aqi: 58, dominant: "PM2.5", pollutants: {pm25: 20, pm10: 35, o3: 58, no2: 20, so2: 8, co: 0.8}},
        {name: "Phoenix", lat: 33.4484, lng: -112.0740, aqi: 134, dominant: "O3", pollutants: {pm25: 45, pm10: 68, o3: 134, no2: 38, so2: 10, co: 1.8}},
        {name: "Montreal", lat: 45.5017, lng: -73.5673, aqi: 72, dominant: "PM2.5", pollutants: {pm25: 26, pm10: 42, o3: 62, no2: 28, so2: 12, co: 1.1}},
        {name: "Houston", lat: 29.7604, lng: -95.3698, aqi: 108, dominant: "O3", pollutants: {pm25: 38, pm10: 55, o3: 108, no2: 42, so2: 18, co: 1.6}},
        {name: "Dallas", lat: 32.7767, lng: -96.7970, aqi: 98, dominant: "O3", pollutants: {pm25: 35, pm10: 48, o3: 98, no2: 35, so2: 15, co: 1.4}},
        {name: "Philadelphia", lat: 39.9526, lng: -75.1652, aqi: 82, dominant: "PM2.5", pollutants: {pm25: 30, pm10: 45, o3: 72, no2: 32, so2: 14, co: 1.2}},
        {name: "Atlanta", lat: 33.7490, lng: -84.3880, aqi: 91, dominant: "O3", pollutants: {pm25: 32, pm10: 48, o3: 91, no2: 28, so2: 12, co: 1.3}},
        {name: "Boston", lat: 42.3601, lng: -71.0589, aqi: 75, dominant: "PM2.5", pollutants: {pm25: 28, pm10: 38, o3: 68, no2: 25, so2: 10, co: 1.0}},
        {name: "Detroit", lat: 42.3314, lng: -83.0458, aqi: 86, dominant: "PM2.5", pollutants: {pm25: 31, pm10: 44, o3: 75, no2: 35, so2: 16, co: 1.4}},
        {name: "San Francisco", lat: 37.7749, lng: -122.4194, aqi: 68, dominant: "PM2.5", pollutants: {pm25: 24, pm10: 38, o3: 65, no2: 22, so2: 8, co: 0.9}},
        {name: "Las Vegas", lat: 36.1699, lng: -115.1398, aqi: 118, dominant: "O3", pollutants: {pm25: 42, pm10: 62, o3: 118, no2: 32, so2: 8, co: 1.6}},
        {name: "Portland", lat: 45.5152, lng: -122.6784, aqi: 62, dominant: "PM2.5", pollutants: {pm25: 22, pm10: 35, o3: 58, no2: 18, so2: 6, co: 0.8}},
        {name: "Calgary", lat: 51.0447, lng: -114.0719, aqi: 55, dominant: "PM10", pollutants: {pm25: 18, pm10: 55, o3: 48, no2: 22, so2: 8, co: 0.9}},
        {name: "Edmonton", lat: 53.5461, lng: -113.4938, aqi: 48, dominant: "PM10", pollutants: {pm25: 16, pm10: 48, o3: 42, no2: 20, so2: 6, co: 0.8}},
        {name: "Ottawa", lat: 45.4215, lng: -75.6972, aqi: 58, dominant: "PM2.5", pollutants: {pm25: 20, pm10: 35, o3: 52, no2: 22, so2: 8, co: 0.9}},
        {name: "Winnipeg", lat: 49.8951, lng: -97.1384, aqi: 52, dominant: "PM10", pollutants: {pm25: 18, pm10: 52, o3: 45, no2: 18, so2: 6, co: 0.8}},
        {name: "Guadalajara", lat: 20.6597, lng: -103.3496, aqi: 165, dominant: "PM2.5", pollutants: {pm25: 78, pm10: 98, o3: 85, no2: 48, so2: 22, co: 2.8}},
        {name: "Monterrey", lat: 25.6866, lng: -100.3161, aqi: 142, dominant: "PM2.5", pollutants: {pm25: 62, pm10: 82, o3: 95, no2: 42, so2: 18, co: 2.2}},
        {name: "Tijuana", lat: 32.5149, lng: -117.0382, aqi: 128, dominant: "PM2.5", pollutants: {pm25: 52, pm10: 72, o3: 88, no2: 38, so2: 15, co: 1.9}},
        {name: "Salt Lake City", lat: 40.7608, lng: -111.8910, aqi: 105, dominant: "PM2.5", pollutants: {pm25: 42, pm10: 58, o3: 82, no2: 28, so2: 10, co: 1.5}},
        {name: "Kansas City", lat: 39.0997, lng: -94.5786, aqi: 88, dominant: "O3", pollutants: {pm25: 32, pm10: 45, o3: 88, no2: 25, so2: 12, co: 1.2}},
        {name: "Nashville", lat: 36.1627, lng: -86.7816, aqi: 92, dominant: "O3", pollutants: {pm25: 35, pm10: 48, o3: 92, no2: 28, so2: 14, co: 1.3}}
    ],
    mapLayers: {
        street: {
            name: "Street Map",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        },
        satellite: {
            name: "Satellite",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        },
        dark: {
            name: "Dark Theme",
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
    },
    weatherConditions: {
        "Partly Cloudy": "🌤️",
        "Sunny": "☀️",
        "Cloudy": "☁️",
        "Scattered Showers": "🌦️",
        "Hot": "🔥",
        "Rainy": "🌧️",
        "Snowy": "❄️",
        "Stormy": "⛈️"
    },
    healthRecommendations: {
        "0-50": {
            general: "Air quality is good. It's safe to exercise outdoors.",
            sensitive: "No special precautions needed.",
            exercise: "All outdoor activities recommended."
        },
        "51-100": {
            general: "Air quality is acceptable. Unusually sensitive people should consider reducing prolonged outdoor exertion.",
            sensitive: "Consider limiting prolonged outdoor activities.",
            exercise: "Generally safe for outdoor exercise."
        },
        "101-150": {
            general: "Active children and adults, and people with respiratory disease should limit prolonged outdoor exertion.",
            sensitive: "Avoid prolonged outdoor activities. Consider indoor alternatives.",
            exercise: "Limit outdoor exercise to 1 hour or less."
        },
        "151-200": {
            general: "Everyone may begin to experience health effects. Avoid prolonged outdoor exertion.",
            sensitive: "Avoid all outdoor activities. Stay indoors.",
            exercise: "Move exercise indoors. Do not exercise outdoors."
        },
        "201-300": {
            general: "Health alert. Avoid all outdoor exertion.",
            sensitive: "Stay indoors with windows closed.",
            exercise: "Indoor exercise only. Avoid all outdoor activities."
        },
        "301+": {
            general: "Emergency conditions. Everyone should avoid all outdoor exertion.",
            sensitive: "Stay indoors. Seek medical attention if experiencing symptoms.",
            exercise: "Do not exercise outdoors or indoors near windows."
        }
    }
};

// Utility Functions
function getAQICategory(aqi) {
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    if (aqi <= 150) return 'unhealthy-sensitive';
    if (aqi <= 200) return 'unhealthy';
    if (aqi <= 300) return 'very-unhealthy';
    return 'hazardous';
}

function getAQIColor(aqi) {
    const category = getAQICategory(aqi);
    const colorMap = {
        'good': '#00e400',
        'moderate': '#ffff00',
        'unhealthy-sensitive': '#ff7e00',
        'unhealthy': '#ff0000',
        'very-unhealthy': '#8f3f97',
        'hazardous': '#7e0023'
    };
    return colorMap[category];
}

function getAQILabel(aqi) {
    const category = getAQICategory(aqi);
    const labelMap = {
        'good': 'Good',
        'moderate': 'Moderate',
        'unhealthy-sensitive': 'Unhealthy for Sensitive Groups',
        'unhealthy': 'Unhealthy',
        'very-unhealthy': 'Very Unhealthy',
        'hazardous': 'Hazardous'
    };
    return labelMap[category];
}

function getMarkerSize(aqi) {
    if (aqi <= 50) return 30;
    if (aqi <= 100) return 35;
    if (aqi <= 150) return 40;
    if (aqi <= 200) return 45;
    if (aqi <= 300) return 50;
    return 55;
}

function calculateCigarettes(aqi) {
    return Math.round((aqi / 22.5) * 10) / 10;
}

function getRecommendationCategory(aqi) {
    if (aqi <= 50) return '0-50';
    if (aqi <= 100) return '51-100';
    if (aqi <= 150) return '101-150';
    if (aqi <= 200) return '151-200';
    if (aqi <= 300) return '201-300';
    return '301+';
}

function saveToStorage(key, data) {
    window[`stored_${key}`] = JSON.stringify(data);
}

function loadFromStorage(key) {
    const data = window[`stored_${key}`];
    return data ? JSON.parse(data) : null;
}

// DOM Elements
const elements = {
    // Navigation
    navItems: document.querySelectorAll('.nav__item'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Sections
    welcomeSection: document.getElementById('welcomeSection'),
    dashboardSection: document.getElementById('dashboardSection'),
    forecastSection: document.getElementById('forecastSection'),
    mapSection: document.getElementById('mapSection'),
    recommendationsSection: document.getElementById('recommendationsSection'),
    
    // Modals
    authModal: document.getElementById('authModal'),
    healthModal: document.getElementById('healthModal'),
    cityDetailsModal: document.getElementById('cityDetailsModal'),
    
    // Auth
    getStartedBtn: document.getElementById('getStartedBtn'),
    authForm: document.getElementById('authForm'),
    authTitle: document.getElementById('authTitle'),
    authSubmit: document.getElementById('authSubmit'),
    authSwitchBtn: document.getElementById('authSwitchBtn'),
    authSwitchText: document.getElementById('authSwitchText'),
    closeAuth: document.getElementById('closeAuth'),
    
    // Health Profile
    healthForm: document.getElementById('healthForm'),
    closeHealth: document.getElementById('closeHealth'),
    editProfileBtn: document.getElementById('editProfileBtn'),
    healthProfileSummary: document.getElementById('healthProfileSummary'),
    
    // City Details Modal
    closeCityDetails: document.getElementById('closeCityDetails'),
    cityDetailsTitle: document.getElementById('cityDetailsTitle'),
    cityAqiValue: document.getElementById('cityAqiValue'),
    cityAqiCategory: document.getElementById('cityAqiCategory'),
    cityDominantPollutant: document.getElementById('cityDominantPollutant'),
    pollutantDetails: document.getElementById('pollutantDetails'),
    cityGeneralRec: document.getElementById('cityGeneralRec'),
    citySensitiveRec: document.getElementById('citySensitiveRec'),
    
    // Search
    citySearch: document.getElementById('citySearch'),
    searchBtn: document.getElementById('searchBtn'),
    searchSuggestions: document.getElementById('searchSuggestions'),
    
    // Map
    mapContainer: document.getElementById('mapContainer'),
    mapMainContainer: document.getElementById('mapMainContainer'),
    mapCitySearch: document.getElementById('mapCitySearch'),
    mapSearchBtn: document.getElementById('mapSearchBtn'),
    fullScreenBtn: document.getElementById('fullScreenBtn'),
    currentLocationBtn: document.getElementById('currentLocationBtn'),
    layerSelector: document.getElementById('layerSelector'),
    aqiFilter: document.getElementById('aqiFilter'),
    legendToggle: document.getElementById('legendToggle'),
    legendContent: document.getElementById('legendContent'),
    
    // Dashboard
    currentLocation: document.getElementById('currentLocation'),
    currentTemp: document.getElementById('currentTemp'),
    currentCondition: document.getElementById('currentCondition'),
    aqiValue: document.getElementById('aqiValue'),
    aqiCategory: document.getElementById('aqiCategory'),
    aqiBarFill: document.getElementById('aqiBarFill'),
    cigaretteCount: document.getElementById('cigaretteCount'),
    windSpeed: document.getElementById('windSpeed'),
    humidity: document.getElementById('humidity'),
    pressure: document.getElementById('pressure'),
    uvIndex: document.getElementById('uvIndex'),
    
    // Recommendations
    generalRecommendation: document.getElementById('generalRecommendation'),
    sensitiveRecommendation: document.getElementById('sensitiveRecommendation'),
    exerciseRecommendation: document.getElementById('exerciseRecommendation'),
    
    // User Status
    userWelcome: document.getElementById('userWelcome'),
    logoutBtn: document.getElementById('logoutBtn')
};

// Global functions for popup access
window.showCityDetails = function(city) {
    elements.cityDetailsTitle.textContent = `${city.name} Air Quality Details`;
    elements.cityAqiValue.textContent = city.aqi;
    elements.cityAqiValue.style.color = getAQIColor(city.aqi);
    elements.cityAqiCategory.textContent = getAQILabel(city.aqi);
    elements.cityDominantPollutant.textContent = city.dominant;

    // Populate pollutant details
    const pollutantMapping = {
        pm25: { name: 'PM2.5', unit: 'μg/m³' },
        pm10: { name: 'PM10', unit: 'μg/m³' },
        o3: { name: 'Ozone', unit: 'ppb' },
        no2: { name: 'NO2', unit: 'ppb' },
        so2: { name: 'SO2', unit: 'ppb' },
        co: { name: 'CO', unit: 'ppm' }
    };

    const pollutantCardsHtml = Object.entries(city.pollutants).map(([key, value]) => {
        const pollutant = pollutantMapping[key];
        return `
            <div class="pollutant-card">
                <div class="pollutant-name">${pollutant.name}</div>
                <div class="pollutant-value">${value}</div>
                <div class="pollutant-unit">${pollutant.unit}</div>
            </div>
        `;
    }).join('');

    elements.pollutantDetails.innerHTML = pollutantCardsHtml;

    // Set recommendations
    const category = getRecommendationCategory(city.aqi);
    const recommendations = mockData.healthRecommendations[category];
    elements.cityGeneralRec.textContent = recommendations.general;
    elements.citySensitiveRec.textContent = recommendations.sensitive;

    showModal('cityDetails');
};

window.selectCityFromMap = function(cityName) {
    selectCity(cityName);
    
    // Close any open popups
    if (appState.map) {
        appState.map.closePopup();
    }
    
    // Navigate to dashboard
    showSection('dashboard');
    elements.navItems.forEach(nav => nav.classList.remove('active'));
    elements.navItems[0].classList.add('active');
};

// Event Listeners
function initializeEventListeners() {
    // Navigation
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            showSection(section);
            
            // Update active state
            elements.navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Theme Toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Get Started Button
    elements.getStartedBtn.addEventListener('click', () => {
        showModal('auth');
    });
    
    // Auth Modal
    elements.closeAuth.addEventListener('click', () => hideModal('auth'));
    elements.authModal.querySelector('.modal__backdrop').addEventListener('click', () => hideModal('auth'));
    elements.authForm.addEventListener('submit', handleAuth);
    elements.authSwitchBtn.addEventListener('click', toggleAuthMode);
    
    // Health Modal
    elements.closeHealth.addEventListener('click', () => hideModal('health'));
    elements.healthModal.querySelector('.modal__backdrop').addEventListener('click', () => hideModal('health'));
    elements.healthForm.addEventListener('submit', handleHealthProfile);
    elements.editProfileBtn.addEventListener('click', () => showModal('health'));
    
    // City Details Modal
    elements.closeCityDetails.addEventListener('click', () => hideModal('cityDetails'));
    elements.cityDetailsModal.querySelector('.modal__backdrop').addEventListener('click', () => hideModal('cityDetails'));
    
    // Search
    elements.citySearch.addEventListener('input', handleCitySearch);
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.citySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Map Search
    elements.mapCitySearch.addEventListener('input', handleMapCitySearch);
    elements.mapSearchBtn.addEventListener('click', handleMapSearch);
    elements.mapCitySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleMapSearch();
    });
    
    // Map Controls
    elements.fullScreenBtn.addEventListener('click', toggleFullscreen);
    elements.currentLocationBtn.addEventListener('click', handleCurrentLocation);
    elements.layerSelector.addEventListener('change', handleLayerChange);
    elements.aqiFilter.addEventListener('change', handleAQIFilter);
    elements.legendToggle.addEventListener('click', toggleLegend);
    
    // Logout
    elements.logoutBtn.addEventListener('click', handleLogout);
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!elements.citySearch.contains(e.target) && !elements.searchSuggestions.contains(e.target)) {
            elements.searchSuggestions.classList.add('hidden');
        }
    });
    
    // Add escape key listener for fullscreen exit
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && appState.isFullscreen) {
            toggleFullscreen();
        }
    });
}

// Map Functions
function initializeMap() {
    if (appState.map) {
        appState.map.remove();
    }

    // Initialize map centered on North America
    appState.map = L.map('mapContainer', {
        zoomControl: false
    }).setView([45.0, -100.0], 4);

    // Add zoom control in top-left
    L.control.zoom({
        position: 'topleft'
    }).addTo(appState.map);

    // Set initial layer
    setMapLayer(appState.currentMapLayer);

    // Add markers for all cities
    addMarkersToMap();

    // Handle map resize
    setTimeout(() => {
        appState.map.invalidateSize();
    }, 100);
}

function setMapLayer(layerType) {
    if (appState.currentLayer) {
        appState.map.removeLayer(appState.currentLayer);
    }

    const layerConfig = mockData.mapLayers[layerType];
    appState.currentLayer = L.tileLayer(layerConfig.url, {
        attribution: layerConfig.attribution,
        maxZoom: 18
    }).addTo(appState.map);

    appState.currentMapLayer = layerType;
}

function addMarkersToMap() {
    // Clear existing markers
    appState.markers.forEach(marker => appState.map.removeLayer(marker));
    appState.markers = [];

    // Get current filter
    const filter = elements.aqiFilter.value;

    mockData.cities.forEach(city => {
        // Apply filter
        if (!shouldShowCity(city, filter)) return;

        const color = getAQIColor(city.aqi);
        const size = getMarkerSize(city.aqi);
        
        // Create custom marker
        const markerHtml = `
            <div class="custom-marker" style="
                border-color: ${color};
                background-color: ${city.aqi > 150 ? color : 'var(--color-surface)'};
                color: ${city.aqi > 150 ? 'white' : 'var(--color-text)'};
                width: ${size}px;
                height: ${size}px;
                font-size: ${size > 40 ? '14px' : '12px'};
            ">
                ${city.aqi}
            </div>
        `;

        const marker = L.marker([city.lat, city.lng], {
            icon: L.divIcon({
                html: markerHtml,
                className: '',
                iconSize: [size, size],
                iconAnchor: [size/2, size/2]
            })
        }).addTo(appState.map);

        // Add popup
        const popupContent = createPopupContent(city);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });

        appState.markers.push(marker);
    });
}

function shouldShowCity(city, filter) {
    switch(filter) {
        case 'good': return city.aqi <= 50;
        case 'moderate': return city.aqi >= 51;
        case 'unhealthy': return city.aqi >= 151;
        case 'all':
        default: return true;
    }
}

function createPopupContent(city) {
    const category = getAQICategory(city.aqi);
    const label = getAQILabel(city.aqi);
    const color = getAQIColor(city.aqi);

    return `
        <div class="custom-popup">
            <h3>${city.name}</h3>
            <div class="aqi-display">
                <span class="aqi-value" style="color: ${color}">${city.aqi}</span>
                <div>
                    <div class="aqi-category">${label}</div>
                    <small>Dominant: ${city.dominant}</small>
                </div>
            </div>
            <div class="popup-actions">
                <button class="btn btn--primary btn--sm" onclick="window.showCityDetails(${JSON.stringify(city).replace(/"/g, '&quot;')})">
                    View Details
                </button>
                <button class="btn btn--secondary btn--sm" onclick="window.selectCityFromMap('${city.name}')">
                    Select City
                </button>
            </div>
        </div>
    `;
}

function handleMapCitySearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) return;
    
    const matchingCity = mockData.cities.find(city => 
        city.name.toLowerCase().includes(query)
    );
    
    if (matchingCity) {
        appState.map.setView([matchingCity.lat, matchingCity.lng], 8);
        // Find and open the popup for this city
        const marker = appState.markers.find(m => 
            Math.abs(m.getLatLng().lat - matchingCity.lat) < 0.01 &&
            Math.abs(m.getLatLng().lng - matchingCity.lng) < 0.01
        );
        if (marker) {
            marker.openPopup();
        }
    }
}

function handleMapSearch() {
    const cityName = elements.mapCitySearch.value;
    handleMapCitySearch({ target: { value: cityName } });
}

function toggleFullscreen() {
    appState.isFullscreen = !appState.isFullscreen;
    elements.mapMainContainer.classList.toggle('fullscreen');
    
    setTimeout(() => {
        if (appState.map) {
            appState.map.invalidateSize();
        }
    }, 100);
    
    elements.fullScreenBtn.textContent = appState.isFullscreen ? 
        '❌ Exit Fullscreen' : '🔍 Full Screen';
}

function handleCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                appState.map.setView([latitude, longitude], 10);
                
                // Find nearest city (simplified)
                let nearestCity = mockData.cities[0];
                let minDistance = Infinity;
                
                mockData.cities.forEach(city => {
                    const distance = Math.sqrt(
                        Math.pow(city.lat - latitude, 2) + 
                        Math.pow(city.lng - longitude, 2)
                    );
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestCity = city;
                    }
                });
                
                // Select nearest city
                selectCity(nearestCity.name);
            },
            (error) => {
                alert('Unable to get your location. Please check your browser settings.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function handleLayerChange(e) {
    setMapLayer(e.target.value);
}

function handleAQIFilter(e) {
    addMarkersToMap();
}

function toggleLegend() {
    const isCollapsed = elements.legendContent.classList.contains('collapsed');
    elements.legendContent.classList.toggle('collapsed');
    elements.legendToggle.textContent = isCollapsed ? '−' : '+';
}

// Authentication Functions
let isLoginMode = true;

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    if (isLoginMode) {
        elements.authTitle.textContent = 'Welcome to Vaayu';
        elements.authSubmit.textContent = 'Sign In';
        elements.authSwitchText.innerHTML = 'Don\'t have an account? <button type="button" class="auth-switch-btn" id="authSwitchBtn">Sign Up</button>';
        document.getElementById('nameGroup').style.display = 'none';
    } else {
        elements.authTitle.textContent = 'Create Your Account';
        elements.authSubmit.textContent = 'Sign Up';
        elements.authSwitchText.innerHTML = 'Already have an account? <button type="button" class="auth-switch-btn" id="authSwitchBtn">Sign In</button>';
        document.getElementById('nameGroup').style.display = 'block';
    }
    
    document.getElementById('authSwitchBtn').addEventListener('click', toggleAuthMode);
}

function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    
    if (isLoginMode) {
        appState.currentUser = { email, name: email.split('@')[0] };
    } else {
        appState.currentUser = { email, name: name || email.split('@')[0] };
    }
    
    saveToStorage('currentUser', appState.currentUser);
    hideModal('auth');
    
    const savedHealthProfile = loadFromStorage('healthProfile');
    if (!savedHealthProfile) {
        showModal('health');
    } else {
        appState.healthProfile = savedHealthProfile;
        updateHealthProfileSummary();
        showDashboard();
    }
    
    updateUserStatus();
}

function handleLogout() {
    appState.currentUser = null;
    appState.healthProfile = null;
    saveToStorage('currentUser', null);
    saveToStorage('healthProfile', null);
    
    showSection('welcome');
    updateUserStatus();
    elements.welcomeSection.classList.remove('hidden');
    elements.dashboardSection.classList.add('hidden');
}

// Health Profile Functions
function handleHealthProfile(e) {
    e.preventDefault();
    
    const conditions = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    
    appState.healthProfile = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        conditions: conditions,
        activityLevel: document.getElementById('activityLevel').value,
        sensitivity: document.getElementById('sensitivity').value
    };
    
    saveToStorage('healthProfile', appState.healthProfile);
    hideModal('health');
    updateHealthProfileSummary();
    showDashboard();
}

function updateHealthProfileSummary() {
    if (!appState.healthProfile) return;
    
    const profile = appState.healthProfile;
    const summary = `
        <h3>Your Health Profile</h3>
        <p><strong>Age:</strong> ${profile.age} | <strong>Gender:</strong> ${profile.gender}</p>
        <p><strong>Activity Level:</strong> ${profile.activityLevel}</p>
        <p><strong>Pollution Sensitivity:</strong> ${profile.sensitivity}</p>
        ${profile.conditions.length > 0 ? `<p><strong>Conditions:</strong> ${profile.conditions.join(', ')}</p>` : ''}
        <button class="btn btn--secondary" id="editProfileBtn">Edit Profile</button>
    `;
    
    elements.healthProfileSummary.innerHTML = summary;
    document.getElementById('editProfileBtn').addEventListener('click', () => showModal('health'));
}

// Search Functions
function handleCitySearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) {
        elements.searchSuggestions.classList.add('hidden');
        return;
    }
    
    const suggestions = mockData.cities.filter(city => 
        city.name.toLowerCase().includes(query)
    ).slice(0, 5);
    
    if (suggestions.length > 0) {
        elements.searchSuggestions.innerHTML = suggestions.map(city => 
            `<div class="suggestion-item" data-city="${city.name}">${city.name}</div>`
        ).join('');
        
        elements.searchSuggestions.classList.remove('hidden');
        
        elements.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                selectCity(item.dataset.city);
                elements.searchSuggestions.classList.add('hidden');
            });
        });
    } else {
        elements.searchSuggestions.classList.add('hidden');
    }
}

function handleSearch() {
    const cityName = elements.citySearch.value;
    const city = mockData.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    
    if (city) {
        selectCity(city.name);
    } else {
        selectCity(mockData.cities[0].name);
    }
    
    elements.searchSuggestions.classList.add('hidden');
}

function selectCity(cityName) {
    const city = mockData.cities.find(c => c.name === cityName);
    if (!city) return;
    
    appState.selectedCity = city;
    appState.currentLocation = cityName;
    
    elements.citySearch.value = cityName;
    updateWeatherData();
    updateAQIData();
    updateRecommendations();
}

// Weather and AQI Functions
function updateWeatherData() {
    if (!appState.selectedCity) return;
    
    const baseTemp = Math.floor(Math.random() * 30) + 60;
    const conditions = ['Partly Cloudy', 'Sunny', 'Cloudy', 'Scattered Showers'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    appState.currentWeather = {
        temperature: baseTemp,
        condition: condition,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 15) + 5,
        pressure: (Math.random() * 2 + 29).toFixed(2),
        uvIndex: Math.floor(Math.random() * 10) + 1
    };
    
    elements.currentLocation.textContent = appState.currentLocation;
    elements.currentTemp.textContent = `${appState.currentWeather.temperature}°F`;
    elements.currentCondition.textContent = appState.currentWeather.condition;
    elements.windSpeed.textContent = `${appState.currentWeather.windSpeed} mph`;
    elements.humidity.textContent = `${appState.currentWeather.humidity}%`;
    elements.pressure.textContent = `${appState.currentWeather.pressure} in`;
    elements.uvIndex.textContent = appState.currentWeather.uvIndex;
    
    const weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.textContent = mockData.weatherConditions[condition] || '🌤️';
}

function updateAQIData() {
    if (!appState.selectedCity) return;
    
    const aqi = appState.selectedCity.aqi;
    appState.currentAQI = aqi;
    
    elements.aqiValue.textContent = aqi;
    elements.aqiCategory.textContent = getAQILabel(aqi);
    
    const percentage = Math.min((aqi / 300) * 100, 100);
    elements.aqiBarFill.style.width = `${percentage}%`;
    elements.aqiBarFill.style.backgroundColor = getAQIColor(aqi);
    
    const aqiCard = document.querySelector('.aqi-card');
    aqiCard.className = `condition-card aqi-card ${getAQICategory(aqi)}`;
    
    const cigarettes = calculateCigarettes(aqi);
    elements.cigaretteCount.textContent = cigarettes;
    
    updateAQIChart();
}

function updateAQIChart() {
    const ctx = document.getElementById('aqiChart').getContext('2d');
    
    const currentAQI = appState.currentAQI;
    const forecastData = [
        currentAQI,
        currentAQI + Math.floor(Math.random() * 20 - 10),
        currentAQI + Math.floor(Math.random() * 30 - 15),
        currentAQI + Math.floor(Math.random() * 25 - 12),
        currentAQI + Math.floor(Math.random() * 20 - 10),
        currentAQI + Math.floor(Math.random() * 15 - 7)
    ].map(val => Math.max(0, val));
    
    const labels = ['Now', '4h', '8h', '12h', '16h', '20h'];
    
    if (window.aqiChart) {
        window.aqiChart.destroy();
    }
    
    window.aqiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'AQI',
                data: forecastData,
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 300,
                    ticks: {
                        callback: function(value) {
                            return value;
                        }
                    }
                }
            }
        }
    });
}

// Recommendations Functions
function updateRecommendations() {
    if (!appState.currentAQI) return;
    
    const category = getRecommendationCategory(appState.currentAQI);
    const recommendations = mockData.healthRecommendations[category];
    
    if (recommendations) {
        elements.generalRecommendation.textContent = recommendations.general;
        elements.sensitiveRecommendation.textContent = getPersonalizedRecommendation(recommendations.sensitive);
        elements.exerciseRecommendation.textContent = recommendations.exercise;
    }
}

function getPersonalizedRecommendation(baseRecommendation) {
    if (!appState.healthProfile) return baseRecommendation;
    
    const profile = appState.healthProfile;
    let recommendation = baseRecommendation;
    
    if (profile.conditions.includes('asthma')) {
        recommendation += ' As an asthma patient, consider using your inhaler before going outside and avoid strenuous outdoor activities.';
    }
    
    if (profile.conditions.includes('heart')) {
        recommendation += ' With heart conditions, limit outdoor exposure during poor air quality days.';
    }
    
    if (profile.sensitivity === 'high') {
        recommendation += ' Given your high sensitivity to air pollution, take extra precautions.';
    }
    
    return recommendation;
}

// UI Functions
function showSection(sectionName) {
    const sections = ['welcome', 'dashboard', 'forecast', 'map', 'recommendations'];
    sections.forEach(section => {
        elements[`${section}Section`].classList.add('hidden');
    });
    
    if (elements[`${sectionName}Section`]) {
        elements[`${sectionName}Section`].classList.remove('hidden');
        
        if (sectionName === 'forecast') {
            initializeForecast();
        } else if (sectionName === 'map') {
            setTimeout(() => initializeMap(), 100);
        }
    }
}

function showDashboard() {
    elements.welcomeSection.classList.add('hidden');
    showSection('dashboard');
    elements.navItems[0].classList.add('active');
    
    if (!appState.selectedCity) {
        selectCity('New York');
    }
}

function showModal(modalName) {
    elements[`${modalName}Modal`].classList.remove('hidden');
}

function hideModal(modalName) {
    elements[`${modalName}Modal`].classList.add('hidden');
}

function updateUserStatus() {
    if (appState.currentUser) {
        elements.userWelcome.textContent = `Welcome back, ${appState.currentUser.name}!`;
        elements.userWelcome.classList.remove('hidden');
        elements.logoutBtn.style.display = 'block';
    } else {
        elements.userWelcome.classList.add('hidden');
        elements.logoutBtn.style.display = 'none';
    }
}

// Forecast Functions
function initializeForecast() {
    const forecastCards = document.getElementById('forecastCards');
    
    const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Scattered Showers', 'Hot'];
    
    const forecastHTML = days.map((day, index) => {
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        const high = Math.floor(Math.random() * 20) + 70;
        const low = high - Math.floor(Math.random() * 15) - 10;
        const rain = Math.floor(Math.random() * 70);
        
        return `
            <div class="forecast-card">
                <div class="forecast-day">${day}</div>
                <div class="forecast-icon">${mockData.weatherConditions[condition] || '🌤️'}</div>
                <div class="forecast-condition">${condition}</div>
                <div class="forecast-temps">
                    <span class="forecast-high">${high}°</span>
                    <span class="forecast-low">${low}°</span>
                </div>
                <div class="forecast-rain">${rain}% rain</div>
            </div>
        `;
    }).join('');
    
    forecastCards.innerHTML = forecastHTML;
}

// Theme Functions
function toggleTheme() {
    appState.theme = appState.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', appState.theme);
    elements.themeToggle.textContent = appState.theme === 'light' ? '🌙' : '☀️';
    saveToStorage('theme', appState.theme);
}

// Initialization
function initializeApp() {
    const savedUser = loadFromStorage('currentUser');
    const savedHealthProfile = loadFromStorage('healthProfile');
    const savedTheme = loadFromStorage('theme');
    
    if (savedUser) {
        appState.currentUser = savedUser;
        updateUserStatus();
        
        if (savedHealthProfile) {
            appState.healthProfile = savedHealthProfile;
            updateHealthProfileSummary();
            showDashboard();
        } else {
            showModal('health');
        }
    }
    
    if (savedTheme) {
        appState.theme = savedTheme;
        document.documentElement.setAttribute('data-color-scheme', appState.theme);
        elements.themeToggle.textContent = appState.theme === 'light' ? '🌙' : '☀️';
    }
    
    initializeEventListeners();
    selectCity('New York');
}

document.addEventListener('DOMContentLoaded', initializeApp);

// Auto-load OpenAQ data when Map section is opened
document.querySelectorAll('.nav__item').forEach(btn => {
  if (btn.getAttribute('data-section') === 'map') {
    btn.addEventListener('click', () => {
      try {
        if (!window._openaqLoaded) {
          window._openaqLoaded = true;
          fetchOpenAQNorthAmerica(progress => {
            console.log('OpenAQ progress:', progress);
          });
        }
      } catch (e) {
        console.error('Error auto-loading OpenAQ data', e);
      }
    });
  }
});
