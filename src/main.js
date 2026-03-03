/* 
1) Importe a sua função lá no topo: import { searchAnime } from './api/httpClient.js';
2) Capture o botão de busca (#searchBtn) e o campo de texto (#searchInput) usando document.querySelector ou getElementById.
3) Crie um addEventListener('click', ...) no botão de busca.
4) Atenção: Como o searchAnime é assíncrono (demora um pouquinho para ir na internet), a função do seu clique também precisa ser async.
5) Dentro do clique, pegue o valor que o usuário digitou (input.value), chame a função: 
const resultados = await searchAnime(valorDigitado);
6) Dê um console.log(resultados) para vermos a mágica. */

import { searchAnime } from './api/httpClient.js';

async function setupFilter() {
  const searchBoxBtn = document.getElementById('searchBtn');
  const searchBoxInput = document.getElementById('searchInput');

  searchBoxBtn.addEventListener('click', async () => {
    const textInput = searchBoxInput.value;
    
    const results = await searchAnime(textInput);

    console.log(results);
  });
}

setupFilter();