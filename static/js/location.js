function loadLocationUI() {
    const citySelect = document.getElementById('city-select');
    const selections = citySelect.getElementsByClassName('menu-select');

    if(window.localStorage.getItem('city')) {
        setCity(window.localStorage.getItem('city'));
    }
    else{
        setCity(selections.item(0).innerText);
    }

    for (let i = 0; i < selections.length; ++i) {
        const btn = selections.item(i);
        btn.onclick = () => {
            setCity(btn.innerText);
            updateUI({type: 'location'});
        }
    }
}

function setCity(city) {
    const cityLabel = this.document.getElementById('city');
    cityLabel.innerText = city;
    window.localStorage.setItem('city', city);
}

function getCity() {
    const selection = document.getElementById('city');
    return selection.innerText;
}