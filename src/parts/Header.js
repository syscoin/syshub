import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";

var publicurl=process.env.PUBLIC_URL;
class Header extends Component {
    render() {
        const { t } = this.props;
        return(
            <header className="header_wrap fixed-top">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand page-scroll animation" to="/" data-animation="fadeInDown" data-animation-delay="1s">
                        <img className="logo_light" src={publicurl+'/assets/images/logo.png'} alt="logo" />
                    </Link>
                    <button className="navbar-toggler animation" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" data-animation="fadeInDown" data-animation-delay="1.1s">
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="dropdown animation" data-animation="fadeInDown" data-animation-delay="1.1s">
                                <Link className="nav-link" activeClassName='active' to="/">{t('header.home')}</Link>
                            </li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.3s"><Link className="nav-link" activeClassName='active' to="/about">{t('header.about')}</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.3s"><Link className="nav-link" activeClassName='active' to="/stats">{t('header.stats')}</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.4s"><Link className="nav-link" activeClassName='active' to="/setup">{t('header.setup')}</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.5s"><Link className="nav-link" activeClassName='active' to="/check">{t('header.check')}</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.6s"><a className="nav-link" rel="noopener noreferrer" href="https://support.syscoin.org/" target="_blank">{t('header.support')}</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        )
    }
}
export default withTranslation()(Header);
