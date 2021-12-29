import { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import logo from "../images/header__logo_large.svg";
import burger from "../images/header__hamburger.svg";
import closeButton from "../images/popup__close-button.svg";

function Header({ onLogout, toggleMenu }) {
  const { email } = useContext(CurrentUserContext);
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    toggleMenu();
    setIsMenuOpen(!isMenuOpen);
  }

  function updateWindowWidth() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  });

  if (windowWidth <= 467)
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Around the U.S. logo" />
        {email ? (
          <img
            className="header__burger"
            src={isMenuOpen ? closeButton : burger}
            alt="open menu"
            onClick={handleMenuClick}
          />
        ) : (
          <nav>
            <ul className="header__nav">
              {location.pathname === "/login" ? (
                <li>
                  <Link className="header__link" to="register">
                    Sign up
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="header__link" to="login">
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </header>
    );
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the U.S. logo" />
      {email ? (
        <nav>
          <ul className="header__nav">
            <li>
              <p className="header__email">{email}</p>
            </li>
            <li className="header__link" onClick={onLogout}>
              Log out
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="header__nav">
            {location.pathname === "/login" ? (
              <li>
                <Link className="header__link" to="register">
                  Sign up
                </Link>
              </li>
            ) : (
              <li>
                <Link className="header__link" to="login">
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
