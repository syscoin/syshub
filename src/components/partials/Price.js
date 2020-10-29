import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import SubTitle from './SubTitle';

export class Price extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            priceData: []
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            priceData: this.props.priceData
        });
    }
    formatNumber = (number) => {
        return Number(number.toString().replace(/,/g, ''));
    }
    priceWizard = (price) => {
        var html=price;
        if(parseFloat(price)>0) {
            html=price+" ▲";
        } else if(parseFloat(price)<0) {
            html=price+" ▼";
        }
        return html;
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <>
                    <SubTitle heading={t('price.title')} />
                    <div className="ministats mndata-expanded">
                        <div className="stat">
                            {t('price.priceTable.price')}
                            <div className="stat-data">${this.state.priceData.price_usd}</div>
                            <div className="stat-data">{this.state.priceData.price_btc} BTC</div>
                        </div>
                        <div className="stat">
                            {t('price.priceTable.volume')}
                            <div className="stat-data">${this.state.priceData.volume_usd}</div>
                            <div className="stat-data">{this.state.priceData.volume_btc} BTC</div>
                        </div>
                        <div className="stat">
                            {t('price.priceTable.marketcap')}
                            <div className="stat-data">${this.state.priceData.market_cap_usd}</div>
                            <div className="stat-data">{this.state.priceData.market_cap_btc} BTC</div>
                        </div>
                        <div className="stat">
                            {t('price.priceTable.change')}
                            <div className="stat-data">{this.priceWizard(this.state.priceData.price_change)}</div>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <p>{t('price.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Price);
