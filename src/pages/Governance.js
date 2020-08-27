import React, { Component } from 'react';
import axios from "axios";

import InnerBanner from '../parts/InnerBanner';
import SuperBlocks from './partials/SuperBlocks';
import GovList from './partials/GovList';
import MetaTags from 'react-meta-tags';
import { withTranslation } from "react-i18next";

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
        let data = await axios
        .get("https://syscoin.dev/mnStats")
        .then(function(result) {
        return result;
        })
        .catch(function(error) {
            this.setState({
                dataLoad: 2
            });
        });
        var stats_response=data.data;

        let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json, text/plain, */*',
            "Access-Control-Allow-Origin": "*",
        }
        };

        let govres=await axios.post('https://syscoin.dev/govlist', [], axiosConfig)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            this.setState({
                dataLoad: 2
            });
        });
        var govdata=govres.data;
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
    render() {
        const { t } = this.props;
        if(this.state.dataLoad===1) {
            return(
                <main className="govPage">
                    <MetaTags>
                        <title>{t('governance.title')}</title>
                        <meta name="keywords" content={t('governance.keywords')} />
                        <meta name="description" content={t('governance.description')} />
                    </MetaTags>
                    <InnerBanner heading={t('governance.heading')}/>
                    <SuperBlocks budgetSum={this.state.budgetSum} superBlockData={this.state.statsData.stats.superblock_stats} />
                    <GovList govData={this.state.govData} statsData={this.state.statsData.stats.mn_stats}/>
                </main>
            )
        } else {
            return(
                <main className="govPage">
                    <MetaTags> 
                        <title>{t('governance.title')}</title>
                        <meta name="keywords" content={t('governance.keywords')} />
                        <meta name="description" content={t('governance.description')} />
                    </MetaTags>
                    <InnerBanner heading={t('governance.heading')}/>
                </main>
            )
        }
    }
}

export default withTranslation()(Governance);
