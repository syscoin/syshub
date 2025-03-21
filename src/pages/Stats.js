import React, { Component } from 'react';
import axios from "axios";

import MetaTags from 'react-meta-tags';
import Background from '../components/global/Background';
import BackgroundInner from '../components/global/BackgroundInner';

import Title from '../components/global/Title';
import StatsShow from '../components/stats/StatsShow';
import LinearChart from '../components/stats/LinearCharts';
import Income from '../components/stats/Income';
import Price from '../components/stats/Price';
import Investment from '../components/stats/Investment';
import Blockchain from '../components/stats/Blockchain';
import WorldMap from '../components/stats/WorldMap';
const API_URI = process.env.REACT_APP_SYS_API_URI
/**
 * Stats page that shows at /stats
 * @component
 * @category Pages
 */
class Stats extends Component {
    /**
     * initialize the state
     * @constructor 
     * @param {*} props 
     */
    constructor(props){  
        super(props);  
        this.state = {  
            dataload: 0,
            api_data: []
        }
    }

    /**
     * We start getStats()
     * @function 
     */
    componentDidMount() {
        this._isMounted = true;
        this.getStats();
    }

    /**
     * Cancel all requests
     * @function
     */
    componentWillUnmount() {
        this._isMounted = false;
        this.source.cancel('Request has been canceled');
    }

    /**
     * Fetch the stats data from the API to modify the state and show the component 
     * @function
     */
    async getStats() {
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
        let data = await axios
            .get(`${API_URI}/statsInfo/mnStats`, {
                headers: {
                    'appclient': process.env.REACT_APP_CLIENT
                },
            cancelToken: this.source.token
        })
        .then(function(result) {
            return result;
        })
        .catch(function (error) {
            // console.log(error);
        });
        if ((typeof data) !== 'undefined') {
            if (this._isMounted) {
                var response=data.data;
                this.setState({ 
                    api_data: response,
                    dataload: 1
                });
            }
        }
    }

    render() {
        if (this.state.dataload === 1) {
            return (
                <Background>
                    <BackgroundInner type="B" />
                    <main className="section statsPage">
                        <MetaTags>
                            <title>Syscoin SentryNodes - SentryNode Stats</title>
                            <meta name="keywords" content="Syscoin, SentryNodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards" />
                            {/* <meta name="description" content="Sysnode.info provides Syscoin SentryNode Operators the tools to maximise the most from their SentryNodes!" /> */}
                        </MetaTags>
                        <div className="shell-large">
                        <div className="section__body">
                            <div className="articles">
                                <section className="article article--revirse article--offsets-bottom">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content">
                                                <Title heading="SentryNodes Stats" />
                                                <StatsShow statsData={this.state.api_data.stats} />
                                                <LinearChart chartData={this.state.api_data.stats.mn_stats}/>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="article article--revirse article--offsets-bottom">
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
                                <section className="article article--revirse article--offsets-bottom">
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
                                <section className="article article--revirse article--offsets-bottom">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content">
                                                <Blockchain blockchainData={this.state.api_data.stats.blockchain_stats} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="article article--revirse article--offsets-bottom">
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
                            <title>Syscoin SentryNodes - SentryNode Stats</title>
                            <meta name="keywords" content="Syscoin, SentryNodes, Blockchain, Crypto, Blockmarket, Coins, Bitcoin, Cryptocurrency, Rewards" />
                            <meta name="description" content="Sysnode.info provides Syscoin SentryNode Operators the tools to maximise the most from their SentryNodes!" />
                        </MetaTags>
                        <div className="shell-large">
                        <div className="section__body">
                            <div className="articles">
                                <section className="article">
                                    <div className="cols">
                                        <div className="col col--size-12">
                                            <div className="article__content article__content--pull-left text-center">
                                                <Title heading="SentryNodes Stats" />
                                                <p>Loading...</p>
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
