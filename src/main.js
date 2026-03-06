import { searchAnime } from './api/httpClient.js';
import { renderAnimes, renderApiError } from './components/ui.js';

async function setupFilter() {
  const loader = document.getElementById('loader');
  const dynamicBg = document.getElementById('dynamicBg');
  const searchBoxBtn = document.getElementById('searchBtn');
  const searchBoxInput = document.getElementById('searchInput');
  const logoPrincipal =  document.getElementById('logo-principal');
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

  logoPrincipal.addEventListener('click', () => {
    location.reload();
  });

  let animationFrameId;

  logoPrincipal.addEventListener('mousemove', (event) => {
    const rect = logoPrincipal.getBoundingClientRect();

    const centerX = rect.left + (rect.width / 2);
    const centerY = rect.top + (rect.height / 2);

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const moveX = (mouseX - centerX) / (rect.width / 2);
    const moveY = (mouseY - centerY) / (rect.height / 2);

    const intensidade = 15; 
    cancelAnimationFrame(animationFrameId); 

    animationFrameId = requestAnimationFrame(() => {
      logoPrincipal.style.setProperty('--move-x', `${moveX * intensidade}px`);
      logoPrincipal.style.setProperty('--move-y', `${moveY * intensidade}px`);
    });
  });

  logoPrincipal.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animationFrameId);
    logoPrincipal.style.setProperty('--move-x', '0px');
    logoPrincipal.style.setProperty('--move-y', '0px');
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

setupFilter();
