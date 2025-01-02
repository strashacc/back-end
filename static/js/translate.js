function loadUI() {
    loadLocationUI();
    loadWeatherUI();
}

function updateUI(update) {
    switch (update.type) {
        case 'location':
            getWeather(getCity());
            break;
    
        default:
            break;
    }
}