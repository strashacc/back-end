const feed = document.getElementById('news');
const trigger = document.getElementById('news-trigger');

function loadNewsUI() {
    getNews();
}

function addNews(news) {
    console.log(news);
    for (let i = 0; i < news.length; ++i) {
        const element = news[i];

        //create article card
        let card = document.createElement('div');
        card.classList.add('card', 'wide');
        card.onclick = () => open(element.url, '_blank');

        //add article image
        let cardImage = document.createElement('div');
        cardImage.classList.add('card-image');

        let cardImg = document.createElement('img');
        cardImg.src = element.urlToImage;
        cardImage.appendChild(cardImg);

        card.appendChild(cardImage);

        //add article content
        let cardContent = document.createElement('div');
        cardContent.classList.add('card-content')
        
        let cardTitle = document.createElement('h3');
        cardTitle.innerText = element.title;
        cardContent.appendChild(cardTitle);
        
        let cardDesc = document.createElement('h5');
        cardDesc.innerText = element.description;
        cardContent.appendChild(cardDesc);
        
        card.appendChild(cardContent);

        feed.appendChild(card);
    }
}

function getNews() {
    var message = {
        type: 'news'
    };
    sendMessage(JSON.stringify(message));
}