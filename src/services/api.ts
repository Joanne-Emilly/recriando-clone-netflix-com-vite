import axios from 'axios';

const basicFetch = async (endpoint: any) => {
  try {
    const response = await axios.get(`${import.meta.env.URL_BASE}.${endpoint}}`, {
      params: {
        api_key: `${import.meta.env.API_KEY}`,
        language: 'pt-BR',
      },
    });
    return response.data;
  } catch (error) {
    console.log('Erro ao carregar os dados', error);
    return null;
  }
};

const getHomeList = async () => {
  return [
    {
      slug: 'originals',
      title: ' Originais do Netflix',
      items: await basicFetch(`/discover/tv?with_network=213`),
    },
    {
      slug: 'trending',
      title: 'Recomendados para você',
      items: await basicFetch(`/trending/all/week`),
    },
    {
      slug: 'toprated',
      title: 'Em Alta',
      items: await basicFetch(`/movie/top_rated`),
    },
    {
      slug: 'action',
      title: 'Ação',
      items: await basicFetch(`/discover/movie?with_genres=28`),
    },
    {
      slug: 'comedy',
      title: 'Comédia',
      items: await basicFetch(`/discover/movie?with_genres=35`),
    },
    {
      slug: 'horror',
      title: 'Terror',
      items: await basicFetch(`/discover/movie?with_genres=27`),
    },
    {
      slug: 'romance',
      title: 'Romance',
      items: await basicFetch(`/discover/movie?with_genres=10749`),
    },
    {
      slug: 'documentary',
      title: 'Documentário',
      items: await basicFetch(`/discover/movie?with_genres=99`),
    },
  ];
};

export default { basicFetch, getHomeList };

///popular?api_key=f095f5543e13ce1bd3313506e7969dc1&language=pt-BR
