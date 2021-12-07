import logo from "../images/header__logo_large.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the U.S. logo" />
    </header>
  );
}

export default Header;
