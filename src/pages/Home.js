import React, { Component } from 'react';
import axios from "axios";

import { withTranslation } from "react-i18next";
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';

import Background from '../parts/Background';
import BackgroundInner from '../parts/BackgroundInner';
import BannerImage from '../parts/BannerImage';
import WorldMap from './partials/WorldMap';
import StatsShow from './partials/StatsShow';
import LinearCharts from './partials/LinearCharts';
import SubTitle from './partials/SubTitle';
import MasternodeTable from './partials/MasternodeTable';

export class Home extends Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            api_data: []
        }
        
    }

    componentDidMount() {
        this._isMounted = true;
        this.getStats();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getStats() {
        let data = await axios
        .get("https://syscoin.dev/mnStats")
        .then(function(result) {
            return result;
        })
        .catch(function(error) {
            console.log(error);
        });
        
        if ((typeof data) !== 'undefined') {
            var response=data.data;
            if (this._isMounted) {
                this.setState({
                    dataload: 1,
                    api_data: response
                });
            }
        }
    }

    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <Background>
                    <BackgroundInner type="A" />
                    <main className="section homePage">
                        <MetaTags>
                            <title>{t('home.title')}</title>
                            <meta name="keywords" content={t('home.keywords')} />
                            <meta name="description" content={t('home.description')} />
                        </MetaTags>
                        <div className="shell-large">
                            <div className="section__body">
                                <div className="articles">
                                    <BannerImage heading={t('home.title')} direction="left">
                                        <div className="article__content-text">
                                            <p>
                                                Everything you need to know about Masternodes and Governance.
                                            </p>
                                        </div>

                                        <div className="article__actions vertical">
                                            <Link to="/about" className="btn btn--blue-border">
                                                Learn More
                                            </Link>
                                            <Link to="/setup" className="btn btn--blue-border">
                                                Setup Masternode
                                            </Link>
                                            <Link to="/signup" className="btn btn--blue-border">
                                                Sign up
                                            </Link>
                                        </div>
                                    </BannerImage>

                                    <section className="article article--revirse article--offsets-bottom">
                                        <div className="cols">
                                            <div className="col col--size-12">
                                                <div className="article__content">
                                                    <SubTitle heading="Check your masternode" />
                                                    <MasternodeTable simple={true} sizePerPage={5} />
                                                    <div className="article__actions text-center">
                                                        <Link to="/masternodes" className="btn btn--blue-border">All masternodes</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    
                                    {/* GOVERNANCE */}

                                    <section className="article article--revirse article--offsets-bottom">
                                        <div className="cols">
                                            <div className="col col--size-12">
                                                <div className="article__content">
                                                    <SubTitle heading="Stats" />
                                                    <StatsShow statsData={this.state.api_data.stats} />
                                                    <LinearCharts chartData={this.state.api_data.stats.mn_stats}/>
                                                    <WorldMap mapData={this.state.api_data.mapData} mapFills={this.state.api_data.mapFills} />
                                                    <div className="article__actions text-center">
                                                        <Link to="/stats" className="btn btn--blue-border">More stats</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </main>
                </Background>
            )
        } else {
            return (
                <Background>
                    <BackgroundInner type="A" />
                    <main className="section homePage">
                        <MetaTags>
                            <title>{t('home.title')}</title>
                            <meta name="keywords" content={t('home.keywords')} />
                            <meta name="description" content={t('home.description')} />
                        </MetaTags>
                        <div className="shell-large">
                            <div className="section__body">
                                <div className="articles">
                                    <BannerImage heading={t('home.title')} direction="left">
                                        <div className="article__content-text">
                                            <p>Everything you need to know about Masternodes and Governance.</p>
                                        </div>

                                        <div className="article__actions vertical">
                                            <Link to="/about" className="btn btn--blue-border">
                                                Learn More
                                            </Link>
                                            <Link to="/setup" className="btn btn--blue-border">
                                                Setup Masternode
                                            </Link>
                                            <Link to="/register" className="btn btn--blue-border">
                                                Register
                                            </Link>
                                        </div>
                                    </BannerImage>
                                </div>
                            </div>
                        </div>
                    </main>
                </Background>
            )
        }
    }
}

export default withTranslation()(Home);
