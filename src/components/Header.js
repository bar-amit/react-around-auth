import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import logo from "../images/header__logo_large.svg";

function Header({ onLogout }) {
  const { email } = useContext(CurrentUserContext);
  const location = useLocation();

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
