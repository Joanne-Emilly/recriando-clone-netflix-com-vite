import styled from 'styled-components';

const Container = styled.div`
  background-color: #111;

  footer {
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    font-family: 'Blinker' sans-serif;
  }

  footer a {
    text-decoration: none;
    color: #fff;
    cursor: pointer;
  }

  footer .gitHub {
    display: flex;
    align-items: center;
  }

  footer .tmdb {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  footer .netflix {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

export default Container;
