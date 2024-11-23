import { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';

const App = () => {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      const list = await api.getHomeList();
      console.log(list);
    };
    loadAll();
  }, []);
  return (
    <div className="App">
      <h1>Estrutura Inicial do Projeto</h1>
    </div>
  );
};

export default App;
