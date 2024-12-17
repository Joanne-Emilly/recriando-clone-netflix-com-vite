import React from 'react';
import ContainerFeatured from './styles';

export interface FeaturedProps {
  title: any;
  backdrop_path: string;
  items: {
    results: {
      backdrop_path: string;
      original_name: string;
      vote_average: number;
      first_air_date: string;
      number_of_seasons: number;
      overview: string;
      genres: { name: string }[];
    }[];
  };
}

const Featured: React.FC<FeaturedProps> = ({ backdrop_path, items }) => {
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  const firstItem = items.results[0];

  if (!firstItem) {
    return null; 
  }

  const firstDate = new Date(firstItem.first_air_date);
  const genres = firstItem.genres.map(genre => genre.name).join(', ');

  return (
    <ContainerFeatured backgroundImage={backgroundImageUrl}>
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <h1>{firstItem.original_name || 'Título não disponível'}</h1>

          <div className="featured--info">
            <div className="featured--points">{firstItem.vote_average} pontos</div>
            <div className="featured--year">{firstDate.getFullYear()}</div>
            <div className="featured--seasons">
              {firstItem.number_of_seasons} Temporada{firstItem.number_of_seasons > 1 ? 's' : ''}
            </div>
            <div className="featured--description">{firstItem.overview}</div>
          </div>
        </div>
      </div>
    </ContainerFeatured>
  );
};

export default Featured;
