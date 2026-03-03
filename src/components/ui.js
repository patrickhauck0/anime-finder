export async function renderAnimes(animes) {
    const resultsContainer = document.querySelector('#results');

    resultsContainer.innerHTML = '';

    for(let anime of animes) {
        let cardDiv = document.createElement('div');
        let cardTitle = document.createElement('h3');
        let cardImg = document.createElement('img');

        cardTitle.textContent = anime.title;
        cardImg.src = anime.images.jpg.image_url;

        cardDiv.appendChild(cardTitle, cardImg);

        resultsContainer.appendChild(cardDiv);
    }
}