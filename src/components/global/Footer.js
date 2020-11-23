import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="shell">
                <div className="footer__inner">
                    <div className="footer__entry">
                    <Link to="/">
                        <div
                        className="logo"
                        style={{
                            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/logo.svg)`,
                        }}
                        ></div>
                    </Link>

                    <nav className="nav">
                        <ul>
                        <li>
                            <Link to="/about">About</Link>
                        </li>

                        <li>
                            <Link to="/stats">Stats</Link>
                        </li>

                        <li>
                            <Link to="/setup">Setup</Link>
                        </li>

                        <li>
                            <Link to="/governance">Governance</Link>
                        </li>

                        <li>
                            <Link to="/check">Masternodes</Link>
                        </li>

                        <li>
                            <a
                            rel="noopener noreferrer"
                            href="https://support.syscoin.org/"
                            target="_blank"
                            >
                            Support
                            </a>
                        </li>
                        </ul>
                    </nav>
                    </div>
                    <div className="footer__content">
                    <div className="socials">
                        <ul>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.facebook.com/Syscoin/"
                            >
                            <i className="ico-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://twitter.com/syscoin"
                            >
                            <i className="ico-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.instagram.com/syscoin_org/"
                            >
                            <i className="ico-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://bitcointalk.org/index.php?topic=1466445.0"
                            >
                            <i className="ico-bitcoin"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://discord.gg/RkK2AXD"
                            >
                            <i className="ico-discord"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://t.me/Syscoin_Official"
                            >
                            <i className="ico-send"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/syscoin"
                            >
                            <i className="ico-github"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.reddit.com/r/SysCoin/"
                            >
                            <i className="ico-reddit"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://bitcoinwisdom.io/markets/binance/sysbtc"
                            >
                            <i className="ico-wisdom"></i>
                            </a>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/company/syscoin/"
                            >
                            <i className="ico-linkedin"></i>
                            </a>
                        </li>
                        <li>
                            <button
                                className="wechat-qr prevent"
                                title=""
                                style={{border: 'none', background:'none'}}
                                data-tip data-for="wechat-qr-code"
                            >
                            <i className="ico-wechat"></i>
                            </button>
                            <ReactTooltip
                                id="wechat-qr-code"
                                aria-haspopup="true"
                                className="tooltipSysClass"
                                backgroundColor="#242652"
                            >
                                <img src="/assets/images/wechat-qr.png" alt="wechat qr code" />
                            </ReactTooltip>
                        </li>
                        <li>
                            <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.youtube.com/channel/UCTx546WgFKfKQg0_814FfMA"
                            >
                            <i className="ico-youtube"></i>
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div className="copyright">
                        <p>© 2020 Syscoin. All rights reserved</p>
                    </div>
                    </div>
                </div>
                </div>
            </footer>
        );
    }

    /* render() {
        return(
        <footer className="footer">
            <div className="container">
                <div className="row">
                <div className="col-12 col-lg-6 text-center text-lg-left order-2 order-lg-1 small">
                        <span className="copyright"><a className="nav-link" rel="noopener noreferrer" href="https://github.com/bigpoppa-sys/sysnode-info" target="_blank">An Open Source Community Project - BigPoppa</a></span>
                    </div> 
                    <div className="col-md-auto text-center text-lg-right order-2 order-lg-1">
                        <ul className="list-inline mb-0 social__icon">
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://www.facebook.com/Syscoin/" target="_blank"><i className="fa fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://twitter.com/syscoin" target="_blank"><i className="fa fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://www.instagram.com/syscoin_org/" target="_blank"><i className="fa fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://github.com/syscoin" target="_blank"><i className="fa fa-github"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://discord.gg/d73qTF9" target="_blank"><i className="fa fa-discord"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://t.me/Syscoin_Official" target="_blank"><i className="fa fa-paper-plane"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://bitcointalk.org/index.php?topic=1466445.0" target="_blank"><i className="fa fa-bitcoin"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://www.reddit.com/r/SysCoin/" target="_blank"><i className="fa fa-reddit"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://bitcoinwisdom.io/markets/binance/sysbtc" target="_blank"><i className="fa fa-line-chart"></i></a></li>
                            <li className="list-inline-item"><a className="nav-link" rel="noopener noreferrer" href="https://www.linkedin.com/company/syscoin/" target="_blank"><i className="fa fa-linkedin"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        )
    } */
}

export default Footer;
