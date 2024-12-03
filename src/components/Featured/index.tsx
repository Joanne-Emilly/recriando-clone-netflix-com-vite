import React from 'react';
import ContainerFeatured from './styles';

interface FeaturedPropos {
  backdrop_path: string;
}

const Featured: React.FC<FeaturedPropos> = ({ backdrop_path }) => {
  return (
    <ContainerFeatured backgroundImage={`url(https://image.tmdb.org/t/p/original${backdrop_path})`}>
      <h1>Filme em Destaque</h1>
    </ContainerFeatured>
  );
};

export default Featured;
