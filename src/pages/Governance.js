import React, { Component } from 'react';
import axios from "axios";

import { withTranslation } from "react-i18next";
import MetaTags from 'react-meta-tags';

import Background from '../components/global/Background';
import BackgroundInner from '../components/global/BackgroundInner';
import BannerImage from '../components/global/BannerImage';
// import SuperBlocks from './governance/SuperBlocks';
import GovList from '../components/governance/GovList';
import GovDetails from '../components/governance/GovDetails';
import ProposalsList from '../components/governance/ProposalsList';

export class Governance extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataLoad: 0,
            statsData: [],
            govData: [],
            budgetSum: 0
        }
    }

    componentDidMount() {
        this.apiLoader();
    }
    
    async apiLoader() {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json, text/plain, */*',
                "Access-Control-Allow-Origin": "*",
            }
        };

        let data = await axios
        .get("https://syscoin.dev/mnStats")
        .then(function(result) {
        return result;
        })
        .catch(function(error) {
            console.log(error)
        });
        
        let govres = await axios.post('https://syscoin.dev/govlist', [], axiosConfig)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });

        
        if ((typeof data) !== 'undefined' && (typeof govres) !== 'undefined') { 
            let stats_response;
            stats_response = data.data;

            let govdata=govres.data;
            Object.keys(govdata).forEach(function(key) {
                if(govdata[key].ObectType===2) {
                    delete govdata[key];
                }
            });
            
            var budgetSum = govdata.reduce(function(sum, d) {
                if(d.payment_amount===undefined) {
                    return sum + 0;
                } else {
                    return sum + d.payment_amount;
                }
            }, 0);

            this.setState({
                statsData: stats_response,
                govData: govdata,
                budgetSum: budgetSum,
                dataLoad: 1
            });
        }
        else {
            this.setState({
                dataLoad: 2
            });
        }
    }
    render() {
        const { t } = this.props;
        if (this.state.dataLoad === 1) {
            // console.log(this.state.govData, "govData");
            // console.log(this.state.statsData, "statsData");

            return (
                <Background>
                    <BackgroundInner />
                    <main className="section govPage">
                        <MetaTags>
                            <title>{t('governance.title')}</title>
                            <meta name="keywords" content={t('governance.keywords')} />
                            <meta name="description" content={t('governance.description')} />
                        </MetaTags>
                        <div className="shell-large">
                            <div className="section__body">
                                <div className="articles">
                                    <BannerImage heading={t('governance.heading')} direction="top-right">
                                        <p>{t('governance.par1')}</p>
                                        <p>{t('governance.par2')}</p>
                                    </BannerImage>

                                    <section className="article article--revirse article--offsets-bottom">
                                        <div className="cols">
                                            <div className="col col--size12">
                                                <div className="article__content">
                                                    <GovList govData={this.state.govData} statsData={this.state.statsData.stats.mn_stats}/>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="article article--revirse article--offsets-bottom">
                                        <div className="cols">
                                            <div className="col col--size12">
                                                <div className="article__content">
                                                    <ProposalsList />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="article">
                                        <GovDetails budgetSum={this.state.budgetSum} superBlockData={this.state.statsData.stats.superblock_stats} />
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
                    <BackgroundInner />
                    <main className="section govPage">
                        <MetaTags> 
                            <title>{t('governance.title')}</title>
                            <meta name="keywords" content={t('governance.keywords')} />
                            <meta name="description" content={t('governance.description')} />
                        </MetaTags>
                        <div className="shell-large">
                            <div className="section__body">
                                <div className="articles">
                                    <BannerImage heading={t('governance.heading')} direction="top-right">
                                        <p>{t('governance.par1')}</p>
                                        <p>{t('governance.par2')}</p>
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

export default withTranslation()(Governance);
