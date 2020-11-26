import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { useUser } from "../../context/user-context";

function Header(props) {
  const { user, logoutUser } = useUser();

  const [isNotTop, setIsNotTop] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const _isNotTop = window.scrollY > 0;
      if (_isNotTop !== isNotTop) {
        setIsNotTop(_isNotTop);
      }
    });
  });

  const menuLinks = () => {
    if (isMobileMenu) {
      toggleMenu();
    }
  };

  const toggleMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  const logout = () => {
    logoutUser();
  }
  const username = (userInfo) => {
    let username = userInfo.data.email.substring(0, userInfo.data.email.lastIndexOf("@"));
    
    return username;
  }

  const { t } = props;
  return (
    <header className={`header ${isNotTop ? "fixed" : ""}`}>
      {/* TODO: add className "fixed" to .header when scroll > 0 */}
      <div className="shell">
        <div className="header__inner">
          <Link to="/" onClick={menuLinks}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/logo.svg)`,
              }}
            ></div>
          </Link>
          {/*TODO:to open mobile menu add className .open to .header__content*/}
          <div className={`header__content ${isMobileMenu ? "open" : ""}`}>
            <nav className="nav">
              <ul style={{ width: "100%" }}>
                <li onClick={menuLinks}>
                  <a
                    rel="noopener noreferrer"
                    href="https://syscoin.org/masternodes"
                    target="_blank"
                  >
                    {t("header.about")}
                  </a>
                </li>

                <li onClick={menuLinks}>
                  <Link to="/stats">{t("header.stats")}</Link>
                </li>

                <li onClick={menuLinks}>
                  <a
                    rel="noopener noreferrer"
                    href="https://support.syscoin.org/t/masternode-setup-guide-fresh-install-automated-server-setup/19"
                    target="_blank"
                  >
                    {t("header.setup")}
                  </a>
                </li>

                <li onClick={menuLinks}>
                  <Link to="/governance">{t("header.governance")}</Link>
                </li>

                <li onClick={menuLinks}>
                  <Link to="/masternodes">{t("header.masternodes")}</Link>
                </li>

                <li onClick={menuLinks}>
                  <a
                    rel="noopener noreferrer"
                    href="https://support.syscoin.org/"
                    target="_blank"
                  >
                    {t("header.support")}
                  </a>
                </li>

                <li>
                  <div className="user">
                    {user ? (
                      <span
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          whiteSpace: "nowrap",
                          maxWidth: "9ch",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {username(user)}
                      </span>
                    ) : (
                      <span>Not logged in </span>
                    )}
                    <i className="icon-user"></i>
                    <div className="dropdown">
                      <ul>
                        {!user && (
                          <li onClick={menuLinks}>
                            <Link to="/login">{t("header.login")}</Link>
                          </li>
                        )}
                        {!user && (
                          <li onClick={menuLinks}>
                            <Link to="/signup">{t("header.signup")}</Link>
                          </li>
                        )}

                        {/* <li className="sep"></li> */}
                        {user && (
                          <li onClick={menuLinks}>
                            <Link to="/profile">{t("header.profile")}</Link>
                          </li>
                        )}
                        {user && (
                          <li onClick={menuLinks}>
                            <Link to="/create-proposal">{t("header.proposal")}</Link>
                          </li>
                        )}
                        {user && (
                          <li onClick={menuLinks}>
                            <button
                              className='nav-btn'
                              onClick={logout}
                            >
                              {t("header.logout")}
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          {/* TODO:click event open mobile menu add className .open to .header__content */}
          <button
            onClick={toggleMenu}
            className="nav-trigger"
            style={{ border: "none", background: "none", outline: "none" }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
export default withTranslation()(Header);
