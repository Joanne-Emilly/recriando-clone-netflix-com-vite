import axios from 'axios';

const URL_BASE = import.meta.env.VITE_URL_BASE;
const API_KEY = import.meta.env.VITE_API_KEY;

const basicFetch = async (endpoint: string) => {
  try {
    const response = await axios.get(`${URL_BASE}${endpoint}`);
    if (!response) {
      throw new Error('Erro na requisição!');
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar os dados da API:', error);
    return null;
  }
};

const getHomeList = async () => {
  return [
    {
      slug: 'originals',
      title: 'Originais do Netflix',
      items: await basicFetch(`/discover/tv?with_network=213&api_key=${API_KEY}&language=pt-BR`),
    },
    {
      slug: 'trending',
      title: 'Recomendados para você',
      items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&language=pt-BR`),
    },
    {
      slug: 'toprated',
      title: 'Em Alta',
      items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}&language=pt-BR`),
    },
    {
      slug: 'action',
      title: 'Ação',
      items: await basicFetch(`/discover/movie?with_genres=28&api_key=${API_KEY}&language=pt-BR`),
    },
    {
      slug: 'comedy',
      title: 'Comédia',
      items: await basicFetch(`/discover/movie?with_genres=35&api_key=${API_KEY}&language=pt-BR`),
    },
    {
      slug: 'horror',
      title: 'Terror',
      items: await basicFetch(`/discover/movie?with_genres=27&api_key=${API_KEY}&language=pt-BR`),
    },
    {
      slug: 'romance',
      title: 'Romance',
      items: await basicFetch(
        `/discover/movie?with_genres=10749&api_key=${API_KEY}&language=pt-BR`,
      ),
    },
    {
      slug: 'documentary',
      title: 'Documentário',
      items: await basicFetch(`/discover/movie?with_genres=99&api_key=${API_KEY}&language=pt-BR`),
    },
  ];
};

const getMovieInfo = async (movieId: string | number, type: string) => {
  let info = null;

  if (movieId) {
    switch (type) {
      case 'movie':
        info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
      case 'tv':
        info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
      default:
        console.warn('Tipo inválido fornecido para getMovieInfo.');
    }
  }
  return info;
};

export default { basicFetch, getHomeList, getMovieInfo };
