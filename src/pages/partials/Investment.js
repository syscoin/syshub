import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

export class Investment extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            investData: [],
            blockchainData: []
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            investData: this.props.investData,
            blockchainData: this.props.blockchainData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
        return(
            <section className="section__Income__investment gradient_box2 pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 animation mb-5 mb-lg-0" data-animation="fadeInUp" data-animation-delay="1s">
                        <div className="Heading__Bar mb-5">
                            <h1 className="text-white font-weight-bold text-center">{t('investment.investmentTable.title')}</h1>
                        </div>
                        <div className="table-responsive">
                            <table className="table live__table table-bordered table-dark table-striped">
                            <thead className="table-heading">
                                    <tr>
                                        <th>{t('investment.investmentTable.label')}</th>
                                        <th>{t('investment.investmentTable.value')}</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>{t('investment.investmentTable.coinsRequired')}</td>
                                        <td>{this.state.investData.collateral_req}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.investmentTable.masterNodePrice')}</td>
                                        <td>${this.state.investData.masternode_price_usd}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.investmentTable.roi')}</td>
                                        <td>{this.state.investData.roi}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.investmentTable.payoutFrequency')}</td>
                                        <td>{this.state.investData.payout_frequency}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.investmentTable.firstPayment')}</td>
                                        <td>{this.state.investData.first_pay}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.investmentTable.rewardAbility')}</td>
                                        <td>{this.state.investData.reward_eligble}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 animation" data-animation="fadeInUp" data-animation-delay="1.1s">
                        <div className="Heading__Bar mb-5">
                            <h1 className="text-white font-weight-bold text-center">{t('investment.blockchainTable.title')}</h1>
                        </div>
                        <div className="table-responsive">
                            <table className="table live__table table-bordered table-dark table-striped">
                                <thead className="table-heading">
                                    <tr>
                                        <th>{t('investment.blockchainTable.label')}</th>
                                        <th>{t('investment.blockchainTable.value')}</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>{t('investment.blockchainTable.version')}</td>
                                        <td>{this.state.blockchainData.version}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.blockchainTable.subVersion')}</td>
                                        <td>{this.state.blockchainData.sub_version}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.blockchainTable.protocol')}</td>
                                        <td>{this.state.blockchainData.protocol}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.blockchainTable.connections')}</td>
                                        <td>{this.state.blockchainData.connections}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.blockchainTable.genesisBlock')}</td>
                                        <td>{this.state.blockchainData.genesis}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('investment.blockchainTable.averageBlockTime')}</td>
                                        <td>{this.state.blockchainData.avg_block}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
        } else {
            return(
                <p>{t('investment.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Investment);
