import { useEffect, useState } from 'react';
import api from './services/api';
import MovieList, { MovieListProps } from './components/MovieRow';
import Container from './app.styles';
import Featured, { FeaturedProps } from './components/Featured/index';
import Header from './components/Header';

const App = () => {
  const [movieList, setMovieList] = useState<MovieListProps[]>([]);
  const [featuredData, setFeaturedData] = useState<FeaturedProps | null>(null);
  const [blackHeader, setBlackHeader] = useState<boolean>(false);

  useEffect(() => {
    const loadAll = async () => {
      // Obtendo a lista de categorias e filmes
      const list = await api.getHomeList();
      setMovieList(list);

      // Escolhendo um item aleatório dos "Originais Netflix"
      const originals = list.filter(i => i.slug === 'originals');
      if (originals.length > 0) {
        const randomChosen = Math.floor(Math.random() * originals[0].items.results.length);
        const chosen = originals[0].items.results[randomChosen];
        const chosenInfo = await api.getMovieInfo(chosen.id, 'tv');

        // Garantindo que todas as propriedades obrigatórias estejam disponíveis
        if (chosenInfo) {
          setFeaturedData({
            backdrop_path: chosenInfo.backdrop_path,
            title: chosenInfo.original_name,
            items: {
              results: [
                {
                  backdrop_path: chosenInfo.backdrop_path,
                  original_name: chosenInfo.original_name,
                  vote_average: chosenInfo.vote_average,
                  first_air_date: chosenInfo.first_air_date,
                  number_of_seasons: chosenInfo.number_of_seasons,
                  overview: chosenInfo.overview,
                  genres: chosenInfo.genres,
                  id: 0
                },
              ],
            },
          });
        }
      }
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <Container>
      <Header blackHeader={blackHeader} />
      {/* Componente do filme em destaque */}
      {featuredData && (
        <Featured
          backdrop_path={featuredData.backdrop_path}
          title={featuredData.title}
          items={featuredData.items}
        />
      )}

      {/* Listas de categorias e filmes */}
      {movieList.map((item, key) => (
        <MovieList  key={key} title={item.title} items={item.items} />
      ))}
    </Container>
  );
};

export default App;
