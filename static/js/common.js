const socket = {};

onload = () => {

    socket.connection = new WebSocket('ws://' + location.hostname + ':8081');

    socket.connection.onopen = function () {
        console.log('Connected to WebSocketServer');
        loadUI();
    }

    socket.connection.onmessage = function (message) {
        msgjson = JSON.parse(message.data);

        switch (msgjson.type) {
            case 'weather':
                setWeather(msgjson.value);
                break;
            case 'news':
                addNews(msgjson.value);
                break;
            case 'translation' :
                receiveTranslation(msgjson.value);
                break;
        }
    }
}

function togglePopup(id) {
    const menu = document.getElementById(id);
    const overlay = document.getElementById('overlay');
    menu.classList.toggle('expanded');
    overlay.classList.toggle('active');

    if (overlay.classList.contains('active'))
        overlay.onclick = () => { togglePopup(id) };
    else
        overlay.onclick = undefined;
}

function checkBottom() {
    
}

function sendMessage(message) {
    socket.connection.send(message);
}