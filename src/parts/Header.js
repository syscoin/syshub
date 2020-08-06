import React, { Component } from 'react';
import { Link } from 'react-router-dom';

var publicurl=process.env.PUBLIC_URL;
class Header extends Component {
    render() {
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
                                <Link className="nav-link" activeClassName='active' to="/">Home</Link>
                            </li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.3s"><Link className="nav-link" activeClassName='active' to="/about">About</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.3s"><Link className="nav-link" activeClassName='active' to="/stats">Stats</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.4s"><Link className="nav-link" activeClassName='active' to="/setup">Setup</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.5s"><Link className="nav-link" activeClassName='active' to="/check">Check</Link></li>
                            <li className="animation" data-animation="fadeInDown" data-animation-delay="1.6s"><a className="nav-link" rel="noopener noreferrer" href="https://support.syscoin.org/" target="_blank">Support</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        )
    }
}
export default Header;
