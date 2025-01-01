function loadUI() {
    loadLocationUI();
    loadWeatherUI();
    loadNewsUI();
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