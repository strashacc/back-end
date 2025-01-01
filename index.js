const express = require('express');
const app = express();
const path = require('path');
const ws = require('ws');
const api = require('./api.json');

const PORT = 80;
const WSPORT = 81;

const wss = new ws.WebSocketServer({ port: WSPORT });

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs')


wss.on('connection', function connection(client) {
    let newsPage = 1;

    client.on('message', function message(message) {
        console.log(JSON.parse(message.toString()));
        const request = JSON.parse(message.toString());
        
        switch (request.type) {
            case 'news' :
                sendNews();
            case 'weather' : 
                sendWeather(request.city);
        }
    });

    function sendNews() {
        getNews('', newsPage)
            .then(response => {
                if (!response) {
                    return;
                }
                let result = [];
                response.articles.forEach(element => {
                    if (element.title === '[Removed]')
                        return;
                    result.push({
                        title: element.title,
                        description: element.description,
                        url: element.url,
                        urlToImage: element.urlToImage
                    });
                });
                message = JSON.stringify({ type: 'news', value: result });
                console.log(result);
                client.send(message);
            });
        newsPage++;
    }

    function sendWeather(city) {     
        getCoords(city).then(response => {
            if (!response) return;
            loc = response[0];

            getWeather(loc.lat, loc.lon)
                .then(res => {
                    message = JSON.stringify({ type: 'weather', value: res});
                    client.send(message);
                });

        });
    }

    console.log(client._socket.remoteAddress);
});


// Zone for URL Mappings
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/calculate-bmi', (req, res) => {
    let weight = req.body['Weight'];
    let height = req.body['Height'] / 100;
    let bmi = (weight / (height * height)).toFixed(1);
    res.render('result', { bmi: bmi });
});

app.listen(PORT, console.log('Server is listening on http://localhost:' + PORT));

//Functions
function getWeather(lat, lon) {
    const API = api.weather;
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + API;

    const promise = fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error('Could not load weather data');
            }
        })
        .catch(error => { console.error(error) });

    return promise;
}

function getNews(country, page) {
    const API = api.news;
    const url = 'https://newsapi.org/v2/everything?q=Kazakhstan' + '&apiKey=' + API + '&pageSize=20' + '&page=' + page;

    const promise = fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error('Could not load news');
            }
        })
        .catch(error => { console.error(error); });


    return promise;
}

function getCoords(city) {
    const API = api.weather;
    const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + API;

    const promise = fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw new Error('Could not load location');
            }
        })
        .catch(error => { console.error(error); });

    return promise;
}
