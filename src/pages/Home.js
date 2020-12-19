import React, { Component } from 'react';
import axios from "axios";

import { withTranslation } from "react-i18next";
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';

import Background from '../components/global/Background';
import BackgroundInner from '../components/global/BackgroundInner';
import BannerImage from '../components/global/BannerImage';
import SubTitle from '../components/global/SubTitle';
import WorldMap from '../components/stats/WorldMap';
import StatsShow from '../components/stats/StatsShow';
import LinearCharts from '../components/stats/LinearCharts';
import MasternodeTable from '../components/masternodes/MasternodeTable';
import ProposalsList from '../components/governance/ProposalsList';
import HomeButtons from '../components/home/HomeButtons';

/**
 * Home page that shows at /
 * @component
 * @category Pages
 */
class Home extends Component {
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
     * Initialize the isMounted property in false
     * @property {boolean} _isMounted used to mount/dismount 
     */
    _isMounted = false;

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
        .get("https://syscoin.dev/mnStats", {
            cancelToken: this.source.token
        })
        .then(function(result) {
            return result;
        })
        .catch(function(error) {
            // console.log(error);
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

                                        <HomeButtons />
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
                                    
                                    <section className="article article--revirse article--offsets-bottom">
                                        <div className="cols">
                                            <div className="col col--size-12">
                                                <div className="article__content">
                                                    <ProposalsList statsData={this.state.api_data.stats.mn_stats} />
                                                    <div className="article__actions text-center">
                                                        <Link to="/governance" className="btn btn--blue-border">More about governance</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

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
