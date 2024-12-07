import styled from 'styled-components';

interface ContainerFeaturedProps {
  backgroundImage: string;
}

const ContainerFeatured = styled.div<ContainerFeaturedProps>`
  height: 100vh;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;

  .featured--horizontal {
    width: 100%;
    height: 100vh;
    background: linear-gradient(to top, #111 10%, transparent 90%);
  }
  .featured--vertical {
    width: 100%;
    height: 100vh;
    background: linear-gradient(to right, #111, transparent);
  }
  h1 {
    font-size: 6rem;
    font-weight: bold;
  }
  .featured--info {
    font-size: 1.8rem;
    font-weight: bold;
    margin-top: 1.5rem;
    margin-right: 1.5rem;
  }

  .featured--points,
  .featured--year,
  .featured--seasons {
    display: inline-block;
    margin-right: 1.5rem;
  }

  .featured--points {
    color: #46d369;
  }

  .featured--description {
    margin-top: 1.5rem;
    font-size: 2rem;
    color: #999;
    max-width: 40%;
  }
`;

export default ContainerFeatured;
