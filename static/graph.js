window.onload = () => {
    const ws = new WebSocket('ws://' + location.hostname + '8081');

    ws.onopen = () => {

    }
    ws.onmessage = (message) => {
        const data = message.data;
        graphData(data);
    }
}

function graphData(data) {
    const graph = new Chart(ctx, {
        type: 'line',
        data: 'data'
    });
}