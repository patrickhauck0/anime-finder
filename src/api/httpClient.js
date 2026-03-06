import axios from 'axios';

export async function searchAnime(query) {
    try {
        const response = await axios(`https://api.jikan.moe/v4/anime?q=${query}`);
        return response.data.data;
    }
    catch (e) {
        console.error("Erro ao buscar anime: ", e);
        throw e;
    }
}