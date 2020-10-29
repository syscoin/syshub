import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import SubTitle from './SubTitle';

class Investment extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            investData: []
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            investData: this.props.investData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <>
                    <SubTitle heading={t('investment.investmentTable.title')} />
                    <div className="ministats mndata-expanded">
                        <div className="stat">
                            {t('investment.investmentTable.coinsRequired')}
                            <div className="stat-data">{this.state.investData.collateral_req}</div>
                        </div>
                        <div className="stat">
                            {t('investment.investmentTable.masterNodePrice')}
                            <div className="stat-data">${this.state.investData.masternode_price_usd}</div>
                        </div>
                        <div className="stat">
                            {t('investment.investmentTable.roi')}
                            <div className="stat-data">{this.state.investData.roi}</div>
                        </div>
                        <div className="stat">
                            {t('investment.investmentTable.payoutFrequency')}
                            <div className="stat-data">{this.state.investData.payout_frequency}</div>
                        </div>
                    </div>
                    <div className="ministats mndata-expanded">
                        <div className="stat">
                            {t('investment.investmentTable.firstPayment')}
                            <div className="stat-data">{this.state.investData.first_pay}</div>
                        </div>
                        <div className="stat">
                            {t('investment.investmentTable.rewardAbility')}
                            <div className="stat-data">{this.state.investData.reward_eligble}</div>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <p>{t('investment.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Investment);
