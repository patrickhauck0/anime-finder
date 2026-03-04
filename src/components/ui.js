export async function renderAnimes(animes) {
    const resultsContainer = document.querySelector('#results');

    resultsContainer.innerHTML = '';

    for(let anime of animes) {
        let animeCardDiv = document.createElement('div');
        animeCardDiv.classList.add('anime-card-div');

        let animeCardTitle = document.createElement('h3');
        
        let animeCardImg = document.createElement('img');
        animeCardImg.classList.add('anime-card-img');

        let animeCardScore = document.createElement('span');
        animeCardScore.classList.add('anime-card-score');

        animeCardTitle.textContent = anime.title;
        animeCardImg.src = anime.images.jpg.image_url;
        animeCardScore.textContent = `⭐${anime.score ? anime.score : 'N/A'}`;

        animeCardDiv.append(animeCardTitle, animeCardImg, animeCardScore);

        resultsContainer.appendChild(animeCardDiv);
    }
}