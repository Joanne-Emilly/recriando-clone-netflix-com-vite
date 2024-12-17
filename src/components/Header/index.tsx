import { BackgroundProps, HeaderStyles } from './styles';
interface HeaderProps {
  blackHeader: boolean;
}
const Header = ({ blackHeader }: HeaderProps) => {
  return (
    <HeaderStyles backgroundColor={blackHeader}>
      <div className="logo-netflix">
        <a href="./">
          <img
            src={`https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940`}
          />
        </a>
      </div>
      <div className="user">
        <a href="./">
          <img src={`https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png`} />
        </a>
      </div>
    </HeaderStyles>
  );
};

export default Header;
