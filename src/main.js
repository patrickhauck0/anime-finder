import { searchAnime } from './api/httpClient.js';
import { renderAnimes } from './components/ui.js';

async function setupFilter() {
  const searchBoxBtn = document.getElementById('searchBtn');
  const searchBoxInput = document.getElementById('searchInput');
  const homeTitle =  document.getElementById('homeTitle');

  searchBoxBtn.addEventListener('click', async () => {
    const textInput = searchBoxInput.value;
    
    if (textInput === '') {
      return;
    }

    const results = await searchAnime(textInput);

    console.log(results);

    renderAnimes(results);
  });

  searchBoxInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchBoxBtn.click();
    }
  });

  homeTitle.addEventListener('click', () => {
    location.reload();
  });

  const animeOnPageLoadInitial = "Naruto";
  const resultsInitial = await searchAnime(animeOnPageLoadInitial);
  renderAnimes(resultsInitial);
}

setupFilter();
