import { useEffect, useState } from 'react';
import api from './services/api';
import MovieList, { MovieListProps } from './components/MovieRow';
import Container from './app.styles';
import Featured from './components/Featured/index';

const App = () => {
  const [movieList, setMovieList] = useState<MovieListProps[]>([]);
  const [featuredData, setFeaturedData] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      const list = await api.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * originals[0].items.results.length - 1);
      let chosen = originals[0].items.results[randomChosen];
      setFeaturedData(chosen);
    };

    loadAll();
  }, []);

  return (
    <>
      {featuredData && <Featured backdrop_path={''} />}
      <Container>
        <h1>Página Inicial do Projeto</h1>
        <section className="lists">
          {movieList.map((item, key) => (
            <MovieList key={key} title={item.title} items={item.items} />
          ))}
        </section>
      </Container>
    </>
  );
};
export default App;
