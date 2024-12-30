import React, { useState } from 'react';
import { ContainerMovieRow } from './styles';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface MovieListProps {
  title: string;
  items: {
    results: { poster_path: string; original_title: string }[];
  };
}
const MovieList: React.FC<MovieListProps> = ({ items, title }) => {
  const [scrollX, setScrollX] = useState(-400);
  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items.results.length * 150;

    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }

    setScrollX(x);
  };

  return (
    <ContainerMovieRow>
      <h2>{title}</h2>
      <div className="movieRowLeft" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRowRight" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieListArea">
        <div
          className="movieList"
          style={{ marginLeft: scrollX, width: items.results.length * 150 }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div className="movieListItem" key={key}>
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                  alt={item.original_title}
                />
              </div>
            ))}
        </div>
      </div>
    </ContainerMovieRow>
  );
};

export default MovieList;
