export async function renderAnimes(animes) {
    const resultsContainer = document.querySelector('#results');

    resultsContainer.innerHTML = '';

    if (!animes || animes.length === 0) {
        let errorMsg = document.createElement('h2');
        errorMsg.classList.add('error-msg');

        errorMsg.textContent = 'Nenhum anime encontrado. Tente outro título!';

        resultsContainer.appendChild(errorMsg);
        return;
    }

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

        animeCardTitle.addEventListener('click', () => {
            try {
                if (anime.trailer && anime.trailer.embed_url) {
                    const videoId = anime.trailer.embed_url.split('/embed/')[1].split('?')[0];
                    
                    const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
                    
                    window.open(youtubeLink, '_blank');
                } else {
                    alert('O trailer oficial desse anime não está disponível! 😢');
                }
            } catch (error) {
                console.error(error);
            }
        });
    }
}