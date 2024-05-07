const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () =&gt; fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&amp;apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data)
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) =&gt; {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =&gt; {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () =&gt; {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
// script.js
const cardsContainer = document.getElementById('cards-container');

const cardData = [
  {
    title: 'This is the Title',
    source: 'End Gadget 26/08/2023',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae saepe quis voluptatum quisquam vitae doloremque facilis molestias quae ratione cumque!',
    image: 'https://via.placeholder.com/400x200',
  },
  // add more card data here
];

cardData.forEach((card) => {
  const cardElement = document.createElement('div');
  cardElement.className = 'card';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';

  const cardImage = document.createElement('img');
  cardImage.src = card.image;
  cardImage.alt = 'news-image';
  cardHeader.appendChild(cardImage);

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  const cardTitle = document.createElement('h3');
  cardTitle.textContent = card.title;
  cardContent.appendChild(cardTitle);

  const cardSource = document.createElement('h6');
  cardSource.className = 'news-source';
  cardSource.textContent = card.source;
  cardContent.appendChild(cardSource);

  const cardDesc = document.createElement('p');
  cardDesc.className = 'news-desc';
  cardDesc.textContent = card.description;
  cardContent.appendChild(cardDesc);

  cardElement.appendChild(cardHeader);
  cardElement.appendChild(cardContent);
  cardsContainer.appendChild(cardElement);
});