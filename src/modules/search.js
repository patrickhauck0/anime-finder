import { searchAnime } from '../api/httpClient.js';
import { renderAnimes, renderApiError } from '../components/ui.js';

export async function setupSearch() {
  const loader = document.getElementById('loader');
  const dynamicBg = document.getElementById('dynamicBg');
  const searchBoxBtn = document.getElementById('searchBtn');
  const searchBoxInput = document.getElementById('searchInput');
  const resultsContainer = document.querySelector('#results');

  searchBoxBtn.addEventListener('click', async () => {
    const textInput = searchBoxInput.value;

    if (textInput === '') {
      return;
    }

    resultsContainer.innerHTML = '';
    loader.style.display = 'block';

    try {
      const results = await searchAnime(textInput);

      console.log(results);
      renderAnimes(results);

      if (results && results.length > 0) {
        const urlImage = results[0].images.jpg.large_image_url;
        dynamicBg.style.backgroundImage = `url('${urlImage}')`;
        dynamicBg.classList.add('animate-bg');
      }
    } catch {
      renderApiError();
    } finally {
      loader.style.display = 'none';
    }
  });

  searchBoxInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchBoxBtn.click();
    }
  });

  resultsContainer.innerHTML = '';
  loader.style.display = 'block';

  try {
    const animeOnPageLoadInitial = "Naruto";
    const resultsInitial = await searchAnime(animeOnPageLoadInitial);
    renderAnimes(resultsInitial);

    if (resultsInitial && resultsInitial.length > 0) {
      const urlImage = resultsInitial[0].images.jpg.large_image_url;
      dynamicBg.style.backgroundImage = `url('${urlImage}')`;
      dynamicBg.classList.add('animate-bg');
    }
  } catch {
    renderApiError();
  } finally {
    loader.style.display = 'none';
  }
}
