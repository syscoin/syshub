import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import isLogin from '../utils/login';


// var publicurl=process.env.PUBLIC_URL;
class Header extends Component {
    state = {
        isNotTop: false,
        isMobileMenu: false
    }
    componentDidMount() {
    document.addEventListener('scroll', () => {
        const isNotTop = window.scrollY > 0;
        if (isNotTop !== this.state.isTop) {
        this.setState({ isNotTop })
        }
    });
    }

    mobileMenu = () => {
        this.setState({ isMobileMenu: !this.state.isMobileMenu });
    }

    render() {
        const { t } = this.props;
        return (
            <header className={`header ${this.state.isNotTop ? 'fixed' : ''}`}>
            {/* TODO: add className "fixed" to .header when scroll > 0 */}
            <div className="shell">
                <div className="header__inner">
                <Link to="/">
                    <div className="logo" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/logo.svg)`}}></div>
                </Link>
                {/*TODO:to open mobile menu add className .open to .header__content*/}
                <div className={`header__content ${this.state.isMobileMenu ? 'open': ''}`}>
                    <nav className="nav">
                    <ul style={{width: '100%'}}>
                        <li>
                            <Link to="/about">{t('header.about')}</Link>
                        </li>

                        <li>
                            <Link to="/stats">{t('header.stats')}</Link>
                        </li>

                        <li>
                            <Link to="/setup">{t('header.setup')}</Link>
                        </li>

                        <li>
                            <Link to="/governance">{t('header.governance')}</Link>
                        </li>

                        <li>
                            <Link to="/check">Masternodes</Link>
                        </li>

                        <li>
                            <a rel="noopener noreferrer" href="https://support.syscoin.org/" target="_blank">{t('header.support')}</a>
                        </li>

                        <li>
                        <div className="user">
                            {isLogin() ? `${'User'} ` : "Not logged in "}<i className="icon-user"></i>
                            <div className="dropdown">
                            <ul>
                                {(!isLogin()) && (
                                    <li>
                                        <Link to="/login">{t('header.login')}</Link>
                                    </li>
                                )}
                                {(!isLogin()) && (
                                    <li>
                                        <Link to="/register">{t('header.register')}</Link>
                                    </li>
                                )}

                                {/* <li className="sep"></li> */}
                                {isLogin() && (
                                    <li>
                                        <Link to="/profile">Profile</Link>
                                    </li>
                                )}
                                {isLogin() && (
                                    <li>
                                        <Link to="/dashboard">{t('header.dashboard')}</Link>
                                    </li>
                                )}
                                {isLogin() && (
                                    <li>
                                        <Link to="/logout">Logout</Link>
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
                        <button onClick={this.mobileMenu} className="nav-trigger" style={{border: 'none',background:'none'}}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                </div>
            </div>
            </header>
        );
    }

    /* render() {
        const { t } = this.props;
        return(
            <header className="header_wrap fixed-top">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand page-scroll animation" to="/" data-animation="fadeInDown" data-animation-delay="1s">
                        <img className="logo_light" src={process.env.PUBLIC_URL+'/assets/images/logo.png'} alt="logo" />
                    </Link>
                    <button className="navbar-toggler animation" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" data-animation="fadeInDown" data-animation-delay="1.1s">
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="dropdown animation" data-animation="fadeInDown" data-animation-delay="1.1s">
                                <Link className="nav-link" to="/">{t('header.home')}</Link>
                            </li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.3s"><Link className="nav-link" to="/about">{t('header.about')}</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.3s"><Link className="nav-link" to="/stats">{t('header.stats')}</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.4s"><Link className="nav-link" to="/setup">{t('header.setup')}</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.5s"><Link className="nav-link" to="/check">{t('header.check')}</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.5s"><Link className="nav-link" to="/governance">{t('header.governance')}</Link></li>
                            {isLogin() && <li className="animation" data-animation="fadeInDown" data-animation-delay="1.5s"><Link className="nav-link" to="/dashboard">{t('header.dashboard')}</Link></li>}
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.6s"><a className="nav-link" rel="noopener noreferrer" href="https://support.syscoin.org/" target="_blank">{t('header.support')}</a></li>
                            {(!isLogin()) && <li className="animation" data-animation="fadeInDown" data-animation-delay="1.5s"><Link className="nav-link" to="/login">{t('header.login')}</Link></li>}
                            {(!isLogin()) && <li className="animation" data-animation="fadeInDown" data-animation-delay="1.5s"><Link className="nav-link" to="/register">{t('header.register')}</Link></li>}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        )
    } */
}
export default withTranslation()(Header);
