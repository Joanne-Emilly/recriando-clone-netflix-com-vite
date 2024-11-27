import { useEffect, useState } from 'react';
import api from './services/api';
import MovieList, { MovieListProps } from './components/MovieRow';
import ContainerStyle from './app.styles';

const App = () => {
  const [movieList, setMovieList] = useState<MovieListProps[]>([]);
  useEffect(() => {
    const loadAll = async () => {
      const list = await api.getHomeList();
      setMovieList(list);
    };
    loadAll();
  }, []);

  return (
    <>
      <ContainerStyle>
        <h1>Página Inicial do Projeto</h1>
        <section className="lists">
          {movieList.map((item, key) => (
            <MovieList key={key} title={item.title} items={item.items} />
          ))}
        </section>
      </ContainerStyle>
    </>
  );
};
export default App;
