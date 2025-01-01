function loadWeatherUI() {
    const city = getCity();
    getWeather(city);
}

function setWeather(weather) {
    widget = document.getElementById('weather-content');
    widget.innerText = Math.floor(weather.main.temp - 273) + " °C";
}

function getWeather(city) {
    var request = {
        type: 'weather',
        city: city
    }
    sendMessage(JSON.stringify(request));
}