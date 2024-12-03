import styled from 'styled-components';

interface ContainerFeaturedProps {
  backgroundImage: string;
}

const ContainerFeatured = styled.div<ContainerFeaturedProps>`
  height: 100vh;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
`;

export default ContainerFeatured;
