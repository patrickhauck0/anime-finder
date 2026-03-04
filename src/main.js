import { searchAnime } from './api/httpClient.js';
import { renderAnimes } from './components/ui.js';

async function setupFilter() {
  const searchBoxBtn = document.getElementById('searchBtn');
  const searchBoxInput = document.getElementById('searchInput');

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
}

setupFilter();
