import styled from 'styled-components';

export const ContainerMovieRow = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    margin: 0px 0px 0px 30px;
  }
  .movieRowLeft,
  .movieRowRight {
    position: absolute;
    width: 4rem;
    height: 225px;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
    display: flex;

    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    transition: 0.5s;
    opacity: 0.5;
  }
  .movieRowLeft {
    left: 0;
  }

  .movieRowRight {
    right: 0;
  }
  .movieRowRight:hover,
  .movieRowLeft:hover {
    opacity: 1;
  }
  .movieListArea {
    overflow: hidden;
    padding-left: 3rem;
  }
  .movieList {
    transition: all ease 0.5s;
  }
  .movieListItem {
    display: inline-block;
    width: 150px;
    cursor: pointer;
  }

  .movieListItem img {
    width: 100%;
    transform: scale(0.9);
    transition: all ease 0.3s;
  }

  .movieListItem img:hover {
    transform: scale(1.5);
  }
  @media (max-width: 760px) {
    .movieRowLeft,
    .movieRowRight {
      opacity: 1;
    }
  }
`;
