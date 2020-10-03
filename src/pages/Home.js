import React, { Component } from 'react';
import axios from "axios";

import { withTranslation } from "react-i18next";
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';

import Background from '../parts/Background';
import BackgroundInner from '../parts/BackgroundInner';
import BannerImage from '../parts/BannerImage';
import Doughnut from './partials/Doughnut';
import Income from './partials/Income';
import Price from './partials/Price';
import Investment from './partials/Investment';
import WorldMap from './partials/WorldMap';

export class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            api_data: []
        }
    }

    componentDidMount() {
        this.getStats();
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
            this.setState({ 
                dataload: 1, 
                api_data: response
            });
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
                                            <Link to="/register" className="btn btn--blue-border">
                                                Register
                                            </Link>
                                        </div>
                                    </BannerImage>
                                    <Doughnut chartData={this.state.api_data.stats.mn_stats}/>
                                    <Income
                                        incomeData={this.state.api_data.stats.income_stats}
                                        incomeSenOneYrData={this.state.api_data.stats.income_stats_seniority_one_year}
                                        incomeSenTwoYrData={this.state.api_data.stats.income_stats_seniority_two_year}
                                    />
                                    <Price priceData={this.state.api_data.stats.price_stats}/>
                                    <Investment investData={this.state.api_data.stats.mn_stats} blockchainData={this.state.api_data.stats.blockchain_stats}/>
                                    <WorldMap mapData={this.state.api_data.mapData} mapFills={this.state.api_data.mapFills}/>
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
