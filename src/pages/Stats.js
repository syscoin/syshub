import React, { Component } from 'react';
import axios from "axios";

import MetaTags from 'react-meta-tags';
import Background from '../parts/Background';
import BackgroundInner from '../parts/BackgroundInner';

import Title from './partials/Title';
import Income from './partials/Income';
import Price from './partials/Price';
import Investment from './partials/Investment';
import WorldMap from './partials/WorldMap';
import LinearChart from './partials/LinearCharts';
import StatsShow from './partials/StatsShow';
import Blockchain from './partials/Blockchain';

export class Stats extends Component {
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
        if (this.state.dataload === 1) {
            return (
                <Background>
                    <BackgroundInner type="B" />
                    <main className="section statsPage">
                        <MetaTags>
                            <title>Syscoin Masternodes - Masternode Stats</title>
                            <meta name="keywords" content="Syscoin, Masternodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards" />
                            <meta name="description" content="Sysnode.info provides Syscoin Masternode Operators the tools to maximise the most from their Masternodes!" />
                        </MetaTags>
                        <div className="shell-large">
                        <div className="section__body">
                            <div className="articles">
                                <section className="article">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content">
                                                <Title heading="Masternode Stats" />
                                                <StatsShow statsData={this.state.api_data.stats} />
                                                <LinearChart chartData={this.state.api_data.stats.mn_stats}/>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="article">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content">
                                                <Income
                                                    incomeData={this.state.api_data.stats.income_stats}
                                                    incomeSenOneYrData={this.state.api_data.stats.income_stats_seniority_one_year}
                                                    incomeSenTwoYrData={this.state.api_data.stats.income_stats_seniority_two_year}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="article">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content">
                                                <Price priceData={this.state.api_data.stats.price_stats}/>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="article">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content">
                                                <Investment investData={this.state.api_data.stats.mn_stats} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="article">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content">
                                                <Blockchain blockchainData={this.state.api_data.stats.blockchain_stats} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="article">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content">
                                                <WorldMap mapData={this.state.api_data.mapData} mapFills={this.state.api_data.mapFills}/>
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
            return(
                <Background>
                    <BackgroundInner type="B" />
                    <main className="section statsPage">
                        <MetaTags>
                            <title>Syscoin Masternodes - Masternode Stats</title>
                            <meta name="keywords" content="Syscoin, Masternodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards" />
                            <meta name="description" content="Sysnode.info provides Syscoin Masternode Operators the tools to maximise the most from their Masternodes!" />
                        </MetaTags>
                        <div className="shell-large">
                        <div className="section__body">
                            <div className="articles">
                                <section className="article">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content article__content--pull-left text-center">
                                                <Title heading="Masternode Stats" />
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
        }
    }
}

export default Stats;