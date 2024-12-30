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
                  id: 0,
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
        <MovieList key={key} title={item.title} items={item.items} />
      ))}
      <footer>
        <a href="https://www.themoviedb.org/?language=pt-BR" target="blank" className="tmdb">
          Dados coletados da API The Movie DataBase
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="#29b6f6"
              d="M47.21,31.81H47.2c-0.09-0.24-0.22-0.46-0.39-0.65c-0.17-0.18-0.37-0.34-0.59-0.45 c-0.25-0.12-0.51-0.21-0.78-0.25v-0.02c0.42-0.12,0.8-0.36,1.08-0.69c0.29-0.35,0.43-0.78,0.42-1.23c0.01-0.4-0.08-0.8-0.29-1.14 c-0.18-0.28-0.43-0.51-0.73-0.67c-0.32-0.16-0.67-0.27-1.03-0.32c-0.29-0.04-0.59-0.07-0.89-0.07c-0.08-0.01-0.16-0.01-0.24-0.01 h-3.24V35h3.56c0.39,0,0.77-0.04,1.15-0.12c0.38-0.08,0.73-0.21,1.06-0.41c0.3-0.18,0.56-0.43,0.76-0.73 c0.2-0.35,0.31-0.75,0.29-1.15C47.34,32.32,47.3,32.06,47.21,31.81z M42.43,27.94h1.3c0.09,0,0.18,0.01,0.27,0.02 c0.06,0,0.13,0.01,0.19,0.02c0.14,0.03,0.28,0.08,0.41,0.14c0.13,0.07,0.23,0.17,0.3,0.28c0.09,0.14,0.13,0.29,0.12,0.45 c0,0.15-0.03,0.3-0.1,0.44c-0.07,0.12-0.17,0.22-0.28,0.3c-0.12,0.07-0.25,0.12-0.39,0.15c-0.08,0.02-0.17,0.04-0.25,0.04 c-0.06,0.01-0.12,0.01-0.18,0.01h-1.39V27.94z M45.31,32.85c-0.08,0.13-0.18,0.24-0.3,0.32c-0.13,0.08-0.27,0.14-0.41,0.17 c-0.15,0.03-0.3,0.05-0.45,0.05h-1.72v-1.96h1.45c0.04,0,0.08,0,0.12,0.01c0.12,0,0.25,0,0.37,0.02c0.17,0.03,0.34,0.07,0.5,0.14 c0.15,0.06,0.29,0.16,0.39,0.29c0.11,0.14,0.16,0.31,0.15,0.49C45.42,32.54,45.39,32.71,45.31,32.85z M38.07,28.66 c-0.26-0.53-0.64-0.99-1.11-1.35c-0.3-0.22-0.62-0.4-0.96-0.53c-0.22-0.1-0.45-0.18-0.68-0.23c-0.65-0.16-1.31-0.24-1.98-0.24 h-2.87V35h3.12c0.63,0,1.26-0.09,1.86-0.28c0.19-0.06,0.37-0.13,0.55-0.22c0.36-0.15,0.7-0.35,1.01-0.6 c0.45-0.37,0.81-0.83,1.07-1.35c0.28-0.58,0.41-1.22,0.4-1.86C38.5,29.99,38.36,29.3,38.07,28.66z M36.24,31.84 c-0.06,0.15-0.14,0.29-0.24,0.42c-0.11,0.15-0.25,0.29-0.4,0.41c-0.3,0.22-0.63,0.37-0.99,0.45c-0.4,0.09-0.81,0.14-1.22,0.13h-1 V28.1h1.13c0.39,0,0.77,0.05,1.15,0.15c0.34,0.1,0.66,0.25,0.95,0.46c0.14,0.11,0.27,0.24,0.38,0.38 c0.09,0.12,0.18,0.25,0.24,0.39c0.17,0.35,0.26,0.73,0.25,1.11C36.5,31.02,36.42,31.45,36.24,31.84z M17.04,15L16,17.93 l-0.97,2.74H15L13,15h-2.9v8.69h1.92v-6.66h0.02l2.21,6.66h1.48L16,22.9l2.01-5.87h0.02v6.66h1.92V15H17.04z M0.73,15v1.69h2.48v7 h1.91V16.7H7.6V15H0.73z M28,29.24c-0.21-0.67-0.58-1.26-1.07-1.75c-0.76-0.75-1.78-1.23-2.93-1.26 c-0.04-0.01-0.09-0.01-0.14-0.01H4.99c-0.34,0-0.67,0.04-0.99,0.12c-1.92,0.44-3.35,2.17-3.35,4.22c0,1.2,0.49,2.28,1.27,3.07 C2.48,34.2,3.2,34.6,4,34.78c0.32,0.08,0.65,0.12,0.99,0.12h18.87c0.05,0,0.1,0,0.14-0.01c1.88-0.05,3.45-1.3,4-3.01 c0.13-0.42,0.2-0.86,0.2-1.32C28.2,30.1,28.13,29.66,28,29.24z M46.08,16.45c-0.56-0.57-1.28-0.97-2.08-1.15 c-0.32-0.08-0.65-0.12-0.99-0.12H26.59c-0.97,0-1.87,0.32-2.59,0.86c-1.06,0.79-1.75,2.05-1.75,3.48c0,1.2,0.49,2.28,1.27,3.06 c0.15,0.15,0.31,0.29,0.48,0.41c0.73,0.54,1.63,0.86,2.59,0.86h16.42c0.34,0,0.67-0.04,0.99-0.12c1.92-0.44,3.35-2.16,3.35-4.21 C47.35,18.32,46.86,17.24,46.08,16.45z"
            ></path>
            <polygon
              fill="#a5d6a7"
              points="4,15 4,23.69 3.21,23.69 3.21,16.69 0.73,16.69 0.73,15"
            ></polygon>
            <path
              fill="#a5d6a7"
              d="M4,26.34v8.44c-0.8-0.18-1.52-0.58-2.08-1.15c-0.78-0.79-1.27-1.87-1.27-3.07 C0.65,28.51,2.08,26.78,4,26.34z"
            ></path>
            <polygon
              fill="#9ad3ae"
              points="5.12,23.69 4,23.69 4,15 7.6,15 7.6,16.7 5.12,16.7"
            ></polygon>
            <path
              fill="#9ad3ae"
              d="M8,26.22v8.68H4.99c-0.34,0-0.67-0.04-0.99-0.12v-8.44c0.32-0.08,0.65-0.12,0.99-0.12H8z"
            ></path>
            <rect width="1.9" height="8.69" x="10.1" y="15" fill="#8ed0b5"></rect>
            <rect width="4" height="8.68" x="8" y="26.22" fill="#8ed0b5"></rect>
            <polygon
              fill="#83cdbd"
              points="16,17.93 16,22.9 15.73,23.69 14.25,23.69 12.04,17.03 12.02,17.03 12.02,23.69 12,23.69 12,15 13,15 15,20.67 15.03,20.67"
            ></polygon>
            <rect width="4" height="8.68" x="12" y="26.22" fill="#83cdbd"></rect>
            <polygon
              fill="#78cac4"
              points="18.01,17.03 16,22.9 16,17.93 17.04,15 19.95,15 19.95,23.69 18.03,23.69 18.03,17.03"
            ></polygon>
            <rect width="4" height="8.68" x="16" y="26.22" fill="#78cac4"></rect>
            <path
              fill="#6dc7cb"
              d="M24,16.04v6.95c-0.17-0.12-0.33-0.26-0.48-0.41c-0.78-0.78-1.27-1.86-1.27-3.06 C22.25,18.09,22.94,16.83,24,16.04z"
            ></path>
            <path
              fill="#6dc7cb"
              d="M23.86,26.22c0.05,0,0.1,0,0.14,0.01v8.66c-0.04,0.01-0.09,0.01-0.14,0.01H20v-8.68H23.86z"
            ></path>
            <path
              fill="#61c5d2"
              d="M28,15.18v8.67h-1.41c-0.96,0-1.86-0.32-2.59-0.86v-6.95c0.72-0.54,1.62-0.86,2.59-0.86H28z"
            ></path>
            <path
              fill="#61c5d2"
              d="M26.93,27.49c0.49,0.49,0.86,1.08,1.07,1.75v2.64c-0.55,1.71-2.12,2.96-4,3.01v-8.66 C25.15,26.26,26.17,26.74,26.93,27.49z"
            ></path>
            <path
              fill="#56c2d9"
              d="M28,29.24c0.13,0.42,0.2,0.86,0.2,1.32c0,0.46-0.07,0.9-0.2,1.32V29.24z"
            ></path>
            <rect width="4" height="8.67" x="28" y="15.18" fill="#56c2d9"></rect>
            <rect width="1.53" height="8.69" x="30.47" y="26.31" fill="#56c2d9"></rect>
            <rect width="4" height="8.67" x="32" y="15.18" fill="#4bbfe0"></rect>
            <path
              fill="#4bbfe0"
              d="M32.39,28.1v5.15h1c0.41,0.01,0.82-0.04,1.22-0.13c0.36-0.08,0.69-0.23,0.99-0.45 c0.15-0.12,0.29-0.26,0.4-0.41v2.24c-0.18,0.09-0.36,0.16-0.55,0.22c-0.6,0.19-1.23,0.28-1.86,0.28H32v-8.69h1.34 c0.67,0,1.33,0.08,1.98,0.24c0.23,0.05,0.46,0.13,0.68,0.23v2.31c-0.11-0.14-0.24-0.27-0.38-0.38c-0.29-0.21-0.61-0.36-0.95-0.46 c-0.38-0.1-0.76-0.15-1.15-0.15H32.39z"
            ></path>
            <path
              fill="#40bce8"
              d="M38.48,30.69c0.01,0.64-0.12,1.28-0.4,1.86c-0.26,0.52-0.62,0.98-1.07,1.35 c-0.31,0.25-0.65,0.45-1.01,0.6v-2.24c0.1-0.13,0.18-0.27,0.24-0.42c0.18-0.39,0.26-0.82,0.25-1.25c0.01-0.38-0.08-0.76-0.25-1.11 c-0.06-0.14-0.15-0.27-0.24-0.39v-2.31c0.34,0.13,0.66,0.31,0.96,0.53c0.47,0.36,0.85,0.82,1.11,1.35 C38.36,29.3,38.5,29.99,38.48,30.69z"
            ></path>
            <rect width="4" height="8.67" x="36" y="15.18" fill="#40bce8"></rect>
            <path
              fill="#34b9ef"
              d="M44,15.3v8.43c-0.32,0.08-0.65,0.12-0.99,0.12H40v-8.67h3.01C43.35,15.18,43.68,15.22,44,15.3z"
            ></path>
            <path
              fill="#34b9ef"
              d="M42.43,27.94v1.85h1.39c0.06,0,0.12,0,0.18-0.01v1.66c-0.04-0.01-0.08-0.01-0.12-0.01h-1.45v1.96H44 V35h-3.48v-8.69h3.24c0.08,0,0.16,0,0.24,0.01v1.64c-0.09-0.01-0.18-0.02-0.27-0.02H42.43z"
            ></path>
            <path
              fill="#29b6f6"
              d="M44,23.73V15.3c0.8,0.18,1.52,0.58,2.08,1.15c0.78,0.79,1.27,1.87,1.27,3.07 C47.35,21.57,45.92,23.29,44,23.73z"
            ></path>
            <path
              fill="#29b6f6"
              d="M47.34,32.59c0.02,0.4-0.09,0.8-0.29,1.15c-0.2,0.3-0.46,0.55-0.76,0.73 c-0.33,0.2-0.68,0.33-1.06,0.41C44.85,34.96,44.47,35,44.08,35H44v-1.61h0.15c0.15,0,0.3-0.02,0.45-0.05 c0.14-0.03,0.28-0.09,0.41-0.17c0.12-0.08,0.22-0.19,0.3-0.32c0.08-0.14,0.11-0.31,0.1-0.47c0.01-0.18-0.04-0.35-0.15-0.49 c-0.1-0.13-0.24-0.23-0.39-0.29c-0.16-0.07-0.33-0.11-0.5-0.14c-0.12-0.02-0.25-0.02-0.37-0.02v-1.66c0.08,0,0.17-0.02,0.25-0.04 c0.14-0.03,0.27-0.08,0.39-0.15c0.11-0.08,0.21-0.18,0.28-0.3c0.07-0.14,0.1-0.29,0.1-0.44c0.01-0.16-0.03-0.31-0.12-0.45 c-0.07-0.11-0.17-0.21-0.3-0.28c-0.13-0.06-0.27-0.11-0.41-0.14c-0.06-0.01-0.13-0.02-0.19-0.02v-1.64c0.3,0,0.6,0.03,0.89,0.07 c0.36,0.05,0.71,0.16,1.03,0.32c0.3,0.16,0.55,0.39,0.73,0.67c0.21,0.34,0.3,0.74,0.29,1.14c0.01,0.45-0.13,0.88-0.42,1.23 c-0.28,0.33-0.66,0.57-1.08,0.69v0.02c0.27,0.04,0.53,0.13,0.78,0.25c0.22,0.11,0.42,0.27,0.59,0.45c0.17,0.19,0.3,0.41,0.39,0.65 h0.01C47.3,32.06,47.34,32.32,47.34,32.59z"
            ></path>
          </svg>
        </a>
        <a
          href="https://github.com/Joanne-Emilly/recriando-clone-netflix-com-vite"
          target="blank"
          className="gitHub"
        >
          Repositorio Joanne-Emilly
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <path fill="#f1bc19" d="M77 12A1 1 0 1 0 77 14A1 1 0 1 0 77 12Z"></path>
            <path fill="#e4e4f9" d="M50 13A37 37 0 1 0 50 87A37 37 0 1 0 50 13Z"></path>
            <path fill="#f1bc19" d="M83 11A4 4 0 1 0 83 19A4 4 0 1 0 83 11Z"></path>
            <path fill="#8889b9" d="M87 22A2 2 0 1 0 87 26A2 2 0 1 0 87 22Z"></path>
            <path
              fill="#fbcd59"
              d="M81 74A2 2 0 1 0 81 78 2 2 0 1 0 81 74zM15 59A4 4 0 1 0 15 67 4 4 0 1 0 15 59z"
            ></path>
            <path fill="#8889b9" d="M25 85A2 2 0 1 0 25 89A2 2 0 1 0 25 85Z"></path>
            <path
              fill="#fff"
              d="M18.5 49A2.5 2.5 0 1 0 18.5 54 2.5 2.5 0 1 0 18.5 49zM79.5 32A1.5 1.5 0 1 0 79.5 35 1.5 1.5 0 1 0 79.5 32z"
            ></path>
            <g>
              <path
                fill="#a3a3cd"
                d="M50 25.625A24.25 24.25 0 1 0 50 74.125A24.25 24.25 0 1 0 50 25.625Z"
              ></path>
              <path
                fill="#472b29"
                d="M50,74.825c-13.757,0-24.95-11.192-24.95-24.95S36.243,24.925,50,24.925s24.95,11.192,24.95,24.95 S63.757,74.825,50,74.825z M50,26.325c-12.985,0-23.55,10.564-23.55,23.55S37.015,73.425,50,73.425s23.55-10.564,23.55-23.55 S62.985,26.325,50,26.325z"
              ></path>
            </g>
            <g>
              <path
                fill="#565fa1"
                d="M50 29.167A20.5 20.5 0 1 0 50 70.167A20.5 20.5 0 1 0 50 29.167Z"
              ></path>
            </g>
            <g>
              <path
                fill="#472b29"
                d="M69.424,44.625c-0.214,0-0.412-0.139-0.478-0.354c-0.088-0.287-0.183-0.571-0.284-0.853 c-0.392-1.094-0.886-2.159-1.47-3.169c-0.139-0.238-0.057-0.545,0.182-0.683c0.239-0.141,0.545-0.057,0.683,0.183 c0.614,1.061,1.134,2.182,1.546,3.331c0.106,0.297,0.206,0.595,0.298,0.897c0.081,0.264-0.067,0.544-0.332,0.625 C69.521,44.618,69.472,44.625,69.424,44.625z"
              ></path>
            </g>
            <g>
              <path
                fill="#472b29"
                d="M50,70.75c-11.511,0-20.875-9.337-20.875-20.813S38.489,29.125,50,29.125 c5.975,0,11.674,2.56,15.636,7.023c0.299,0.337,0.588,0.685,0.865,1.041c0.169,0.218,0.13,0.531-0.087,0.701 c-0.218,0.171-0.532,0.131-0.702-0.088c-0.264-0.339-0.54-0.669-0.824-0.99c-3.772-4.25-9.199-6.688-14.888-6.688 c-10.959,0-19.875,8.888-19.875,19.813S39.041,69.75,50,69.75s19.875-8.888,19.875-19.813c0-0.995-0.075-1.996-0.222-2.973 c-0.041-0.272,0.147-0.527,0.42-0.568c0.278-0.045,0.528,0.147,0.569,0.42c0.154,1.025,0.233,2.076,0.233,3.121 C70.875,61.413,61.511,70.75,50,70.75z"
              ></path>
            </g>
            <g>
              <path
                fill="#fefdef"
                d="M61.496,42.088c0.365-1.671,0.206-3.743-0.486-5.818c-3.622,0-6.339,2.716-6.339,2.716 s0.016,0.018,0.02,0.023C54.627,39.008,54.565,39,54.5,39h-9c-0.043,0-0.085,0.006-0.128,0.006c0.003-0.004,0.017-0.02,0.017-0.02 s-2.717-2.716-6.339-2.716c-0.684,2.053-0.85,4.104-0.5,5.767C36.973,43.732,36,46,36,48.5c0,5.247,4.253,9.5,9.5,9.5h1.073 c-1.304,0.709-2.246,1.979-2.493,3.498c-1.72,0.232-3.979,0.18-5.028-1.394c-1.811-2.717-2.717-2.717-3.622-2.717 s-0.906,0.906,0,1.811c0.906,0.906,0.906,0.906,1.811,2.717c0.772,1.543,2.812,3.298,6.76,2.663v3.523 c0,0.447,0.079,0.871,0.191,1.282c2.425,0.577,6.502,1.061,11.665-0.151C55.943,68.868,56,68.493,56,68.102v-5.816 c0-1.858-1.047-3.456-2.573-4.286H54.5c5.247,0,9.5-4.253,9.5-9.5C64,46.025,63.046,43.779,61.496,42.088z"
              ></path>
              <path
                fill="#472b29"
                d="M49.532,70.486c-2.23,0-4.075-0.287-5.457-0.616c-0.178-0.042-0.319-0.179-0.367-0.355 c-0.142-0.522-0.208-0.972-0.208-1.413V65.15c-4.563,0.514-6.279-2.154-6.707-3.011c-0.87-1.739-0.87-1.739-1.717-2.587 c-0.701-0.701-0.979-1.458-0.745-2.023c0.169-0.408,0.569-0.642,1.098-0.642c1.217,0,2.219,0.211,4.038,2.939 c0.839,1.258,2.676,1.379,4.193,1.218c0.23-0.978,0.724-1.855,1.423-2.554C39.762,58.272,35.5,53.875,35.5,48.5 c0-2.442,0.891-4.78,2.513-6.613c-0.306-1.722-0.108-3.761,0.564-5.775c0.068-0.204,0.259-0.342,0.474-0.342 c3.357,0,5.931,2.16,6.552,2.73h8.854c0.621-0.57,3.195-2.73,6.552-2.73c0.215,0,0.406,0.138,0.474,0.342 c0.679,2.037,0.872,4.096,0.551,5.83c1.591,1.826,2.465,4.146,2.465,6.559c0,5.375-4.263,9.773-9.585,9.991 c1.001,0.997,1.585,2.354,1.585,3.794v5.816c0,0.392-0.052,0.8-0.158,1.246c-0.043,0.185-0.188,0.328-0.372,0.371 C53.582,70.28,51.419,70.486,49.532,70.486z M44.602,68.965c2.412,0.537,6.153,0.9,10.83-0.148 c0.045-0.253,0.068-0.489,0.068-0.715v-5.816c0-1.597-0.886-3.07-2.312-3.846c-0.201-0.109-0.302-0.341-0.246-0.563 c0.056-0.222,0.256-0.377,0.484-0.377H54.5c4.962,0,9-4.037,9-9c0-2.247-0.843-4.404-2.373-6.074 c-0.11-0.12-0.154-0.286-0.12-0.444c0.331-1.517,0.202-3.352-0.36-5.202c-2.87,0.153-5.098,2.074-5.542,2.484 c-0.091,0.151-0.245,0.246-0.429,0.246c-0.007,0-0.096-0.006-0.103-0.006L45.5,39.5c-0.152,0-0.332-0.067-0.442-0.181l-0.021,0.021 c-0.025-0.024-2.438-2.39-5.623-2.561c-0.557,1.831-0.69,3.649-0.373,5.154c0.034,0.159-0.013,0.325-0.124,0.444 C37.358,44.052,36.5,46.227,36.5,48.5c0,4.963,4.038,9,9,9h1.073c0.229,0,0.428,0.155,0.484,0.377 c0.057,0.222-0.044,0.453-0.246,0.563c-1.205,0.654-2.021,1.799-2.238,3.139c-0.036,0.218-0.208,0.386-0.427,0.415 c-2.664,0.358-4.568-0.198-5.511-1.611c-1.663-2.494-2.412-2.494-3.206-2.494c-0.137,0-0.18,0.032-0.181,0.032 c-0.025,0.064,0.043,0.435,0.534,0.926c0.963,0.963,0.998,1.033,1.905,2.847c0.369,0.736,1.911,3.093,6.233,2.392 c0.147-0.021,0.292,0.019,0.404,0.113c0.111,0.096,0.176,0.234,0.176,0.381v3.523C44.5,68.372,44.533,68.651,44.602,68.965z"
              ></path>
            </g>
            <g>
              <path fill="#fefdef" d="M60.437,51.362c-0.9,1.994-2.876,3.652-6.354,3.93"></path>
              <path
                fill="#472b29"
                d="M54.083,55.542c-0.129,0-0.238-0.1-0.249-0.23c-0.011-0.138,0.091-0.258,0.229-0.269 c3.805-0.305,5.442-2.227,6.146-3.784c0.058-0.127,0.205-0.183,0.331-0.125c0.125,0.057,0.182,0.204,0.125,0.33 c-1.073,2.377-3.403,3.824-6.562,4.077C54.097,55.542,54.09,55.542,54.083,55.542z"
              ></path>
            </g>
            <g>
              <path fill="#fefdef" d="M60.959,47.41c0.111,0.753,0.109,1.552-0.03,2.342"></path>
              <path
                fill="#472b29"
                d="M60.93,50.002c-0.015,0-0.029-0.001-0.044-0.004c-0.136-0.023-0.227-0.153-0.203-0.289 c0.129-0.734,0.139-1.517,0.029-2.263c-0.021-0.136,0.074-0.264,0.21-0.283c0.137-0.02,0.264,0.073,0.284,0.211 c0.12,0.809,0.109,1.624-0.031,2.421C61.155,49.917,61.049,50.002,60.93,50.002z"
              ></path>
            </g>
            <g>
              <path fill="#fefdef" d="M59.083,43.875c0.633,0.451,1.146,1.179,1.488,2.055"></path>
              <path
                fill="#472b29"
                d="M60.571,46.181c-0.1,0-0.194-0.061-0.233-0.159c-0.334-0.856-0.818-1.528-1.4-1.942 c-0.112-0.08-0.139-0.236-0.059-0.349c0.081-0.113,0.236-0.138,0.349-0.06c0.662,0.472,1.207,1.222,1.576,2.169 c0.05,0.129-0.014,0.273-0.142,0.324C60.632,46.175,60.602,46.181,60.571,46.181z"
              ></path>
            </g>
          </svg>
        </a>

        <a href="https://www.netflix.com/br/" target="blank" className="netflix">
          &copy; 2024{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
          >
            <path
              fill="#F44336"
              d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"
            ></path>
          </svg>
          Todos os direitos reservados.
        </a>
      </footer>
    </Container>
  );
};

export default App;
