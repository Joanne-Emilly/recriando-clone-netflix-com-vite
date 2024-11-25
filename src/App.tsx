import { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';
import MovieList, { MovieListProps } from './components/MovieList/MovieList';

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
    <div className="page">
      <h1>Página Inicial do Projeto</h1>
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieList key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
export default App;
