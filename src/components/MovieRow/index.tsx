import React from 'react';
import { ContainerMovieRow } from './styles';
export interface MovieListProps {
  title: string;
  items: {
    results: { poster_path: string; original_title: string }[];
  };
}
const MovieList: React.FC<MovieListProps> = ({ items, title }) => {
  return (
    <ContainerMovieRow>
      <h2>{title}</h2>
      <div className="movieListArea">
        <div className="movieList">
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
