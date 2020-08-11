import React, { Component } from 'react';
import axios from "axios";

import Banner from '../parts/Banner';
import Doughnut from './partials/Doughnut';
import Income from './partials/Income';
import Price from './partials/Price';
import Investment from './partials/Investment';
import WorldMap from './partials/WorldMap';
import MetaTags from 'react-meta-tags';
import { withTranslation } from "react-i18next";

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
        var response=data.data;

        this.setState({
            dataload: 1,
            api_data: response
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return(
                <main className="homePage">
                    <MetaTags>
                        <title>{t('home.title')}</title>
                        <meta name="keywords" content={t('home.keywords')} />
                        <meta name="description" content={t('home.description')} />
                    </MetaTags>
                    <Banner />
                    <Doughnut chartData={this.state.api_data.stats.mn_stats}/>
                    <Income incomeData={this.state.api_data.stats.income_stats} incomeSenOneYrData={this.state.api_data.stats.income_stats_seniority_one_year}/>
                    <Price priceData={this.state.api_data.stats.price_stats}/>
                    <Investment investData={this.state.api_data.stats.mn_stats} blockchainData={this.state.api_data.stats.blockchain_stats}/>
                    <WorldMap mapData={this.state.api_data.mapData} mapFills={this.state.api_data.mapFills}/>
                </main>
            )
        } else {
            return(
                <main className="homePage">
                    <MetaTags>
                        <title>{t('home.title')}</title>
                        <meta name="keywords" content={t('home.keywords')} />
                        <meta name="description" content={t('home.description')} />
                      </MetaTags>
                    <Banner />
                </main>
            )
        }
    }
}

export default withTranslation()(Home);
