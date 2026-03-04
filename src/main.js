import { searchAnime } from './api/httpClient.js';
import { renderAnimes } from './components/ui.js';

async function setupFilter() {
  const searchBoxBtn = document.getElementById('searchBtn');
  const searchBoxInput = document.getElementById('searchInput');

  searchBoxBtn.addEventListener('click', async () => {
    const textInput = searchBoxInput.value;
    
    const results = await searchAnime(textInput);

    console.log(results);

    renderAnimes(results);
  });
}

setupFilter();
