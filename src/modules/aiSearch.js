import { supabase } from '../api/supabase.js';
import { renderAnimes } from '../components/ui.js';

export function aiSearch() {
    const aiBtn = document.getElementById('aiBtn');
    const aiWelcome = document.getElementById('aiWelcome');
    const loader = document.getElementById('loader');
    const resultsContainer = document.getElementById('results');
    const dynamicBg = document.getElementById('dynamicBg');

    aiBtn.addEventListener('click', async () => {
        const aiInput = document.getElementById('aiInput');

        if (!aiInput.value.trim()) return;

        aiWelcome.style.display = 'none';
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        loader.style.display = 'block';

        try {
            const { data, error } = await supabase.functions.invoke('recommend-anime', {
                body: { userPrompt: aiInput.value }
            });

            if (error) throw error;

            const animeNameList = JSON.parse(data.result);

            const animeNameFromJikanAPI = [];

            for (const name of animeNameList) {
                const response = await fetch (`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(name)}&limit=1`);
                const resultJikan = await response.json();

                if (resultJikan.data && resultJikan.data.length > 0) {
                    animeNameFromJikanAPI.push(resultJikan.data[0]);
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            loader.style.display = 'none';

            if (animeNameFromJikanAPI && animeNameFromJikanAPI.length > 0) {
                const urlImage = animeNameFromJikanAPI[0].images.jpg.large_image_url;

                dynamicBg.style.backgroundImage = `url('${urlImage}')`;
                dynamicBg.classList.add('animate-bg');
            }

            resultsContainer.style.display = 'grid';

            renderAnimes(animeNameFromJikanAPI);
        } catch (err) {
            console.error(`Ocorreu um erro na recomendação:`, err);
            loader.style.display = 'none';
            aiWelcome.style.display = 'block';
            alert("Erro ao buscar recomendações. Verifique se você está logado!");
        }
    });
}