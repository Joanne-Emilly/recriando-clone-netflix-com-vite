import styled from 'styled-components';

export const ContainerMovieRow = styled.div`
  margin-bottom: 30px;
  ///Retirar para fazer o carrosel
  width: 999999999999999999px;
  h2 {
    font-size: 2.5rem;
    margin: 0px 0px 0px 30px;
  }

  .movieListArea {
    overflow: hidden;
    padding-left: 30px;
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
`;
