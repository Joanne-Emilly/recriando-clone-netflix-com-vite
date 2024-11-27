import styled from 'styled-components';

const StyleMovieRow = styled.div`
  margin-bottom: 30px;
  h2 {
    font-size: 2.5rem;
    margin: 0px 0px 0px 30px;
  }

  .movieListArea {
    padding-left: 30px;
  }

  .movieListItem {
    display: inline-block;
    width: 150px;
    cursor: pointer;
  }

  .movieListItem img {
    width: 100%;
  }
`;

export default StyleMovieRow;
