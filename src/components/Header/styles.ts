import styled from 'styled-components';
export interface BackgroundProps {
  backgroundColor: boolean;
}
export const HeaderStyles = styled.div<BackgroundProps>`
  background-color: ${props => (props.backgroundColor ? '#141414' : 'transparent')};
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  height: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  transition: 0.7s;

  .logo-netflix {
    height: 7rem;
  }
  .logo-netflix img {
    height: 100%;
  }

  .user {
    height: 5rem;
  }

  .user img {
    height: 100%;
    border-radius: 0.3rem;
  }
`;
