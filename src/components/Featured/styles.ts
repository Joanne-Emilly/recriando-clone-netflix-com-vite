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
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 3rem;
    padding-top: 7rem;
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

  .featured--points,
  .featured--year,
  .featured--seasons {
    display: inline-block;
    margin-right: 1.5rem;
    margin-top: 1.5rem;
    font-size: 1.8rem;
    font-weight: bold;
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

  .featured--buttons {
    margin-top: 1.5rem;
  }
  .featured--watchbutton,
  .featured--mylistbutton {
    display: inline-block;
    font-size: 2rem;
    font-weight: bold;
    padding: 1.2rem 2.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    margin-right: 1rem;
    opacity: 1;
    transition: all ease 0.2s;
  }
  .featured--watchbutton {
    background: #fff;
    color: #000;
  }
  .featured--mylistbutton {
    background: #333;
    color: #fff;
  }

  .featured--watchbutton:hover,
  .featured--mylistbutton:hover {
    opacity: 0.7;
  }

  .featured--genres,
  strong {
    margin-top: 1.5rem;
    font-size: 1.8rem;
    color: #999;
  }

  @media (max-width: 760px) {
    .featured {
      height: 90vh;
    }
    .featured--name {
      font-size: 4rem;
    }
    .featured--info {
      font-size: 1.6rem;
    }
    .featured-description {
      font-size: 1.4rem;
      max-width: 100%;
      margin-right: 3rem;
    }
    .featured--watchbutton,
    .featured--mylistbutton {
      font-size: 1.6rem;
    }
    .featured--genres {
      font-size: 1.4rem;
    }
  }
`;

export default ContainerFeatured;
