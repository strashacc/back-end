function loadUI() {
    const translateBtn = document.getElementById('translateBtn');

    translateBtn.onclick = () => {
        Translate()
    };

    loadLocationUI();
    loadWeatherUI();

    const input = document.getElementById('input-lang-select');
    const inputs = input.getElementsByClassName('menu-select');

    for (let i = 0; i < inputs.length; ++i) {
        const btn = inputs.item(i);
        btn.onclick = () => {
            setInputLang(btn.innerText);
        }
    }
    
    const output = document.getElementById('output-lang-select');
    const outputs = output.getElementsByClassName('menu-select');

    for (let i = 0; i < outputs.length; ++i) {
        const btn = outputs.item(i);
        btn.onclick = () => {
            setOutputLang(btn.innerText);
        }
    }
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

function setInputLang(lang) {
    const inputBtn = document.getElementById('input-lang');

    inputBtn.innerText = lang;
}
function getInputLang() {
    const lang = document.getElementById('input-lang');
    return lang.innerText;
}
function setOutputLang(lang) {
    const inputBtn = document.getElementById('output-lang');

    inputBtn.innerText = lang;
}
function getOutputLang() {
    const lang = document.getElementById('output-lang');
    return lang.innerText;
}

function Translate() {
    const input = document.getElementById('translate-input');
    console.log(input.value);
    const request = {
        type: 'translate',
        value: {
            inputLang: getInputLang(),
            outputLang: getOutputLang(),
            text: input.value
        }
    }
    console.log(request);
    const message = JSON.stringify(request);

    sendMessage(message);
}
function receiveTranslation(value) {
    const output = document.getElementById('translate-output');
    output.innerText = value;
}