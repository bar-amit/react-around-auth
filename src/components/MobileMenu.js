import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link, useLocation } from "react-router-dom";

export default function MobileMenu({ isOpen, onLogout }) {
  const location = useLocation();
  const { email } = useContext(CurrentUserContext);

  return (
    <>
      {email ? (
        <nav className={`mobile-menu ${isOpen ? "mobile-menu_visible" : ""}`}>
          <ul className="mobile-menu__nav">
            <li>
              <p className="mobile-menu__email">{email}</p>
            </li>
            <li className="mobile-menu__link" onClick={onLogout}>
              Log out
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={`mobile-menu ${isOpen ? "mobile-menu_visible" : ""}`}>
          <ul className="mobile-menu__nav">
            {location.pathname === "/login" ? (
              <li>
                <Link className="mobile-menu__link" to="register">
                  Sign up
                </Link>
              </li>
            ) : (
              <li>
                <Link className="mobile-menu__link" to="login">
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
