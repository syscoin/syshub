import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

export class Income extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            incomeData: [],
            incomeSenOneYrData: []
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            incomeData: this.props.incomeData,
            incomeSenOneYrData: this.props.incomeSenOneYrData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
        return(
            <section className="section__Income bg-cover pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="Heading__Bar text-center mb-5">
                            <h1 className="text-white display-4 animation font-weight-bold" data-animation="fadeInUp" data-animation-delay="1s">{t('income.title')}</h1>
                        </div>
                    </div>
                </div>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">{t('income.tabs.latestStats')}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">{t('income.tabs.oneYearSeniority')}</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3 animation mb-5 mb-lg-0" data-animation="fadeInUp" data-animation-delay="1s">
                                <div className="pricebar__block text-center">
                                    <div className="pricebar__block__title">{t('income.income.daily')}</div>
                                    <div className="pricebar__block__content">
                                        <div>{this.state.incomeData.usd.daily}</div>
                                        <div>{this.state.incomeData.btc.daily}</div>
                                        <div className="font-weight-bold">{this.state.incomeData.sys.daily}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 animation mb-5 mb-lg-0" data-animation="fadeInUp" data-animation-delay="1.1s">
                                <div className="pricebar__block text-center">
                                    <div className="pricebar__block__title">{t('income.income.weekly')}</div>
                                    <div className="pricebar__block__content">
                                        <div>{this.state.incomeData.usd.weekly}</div>
                                        <div>{this.state.incomeData.btc.weekly}</div>
                                        <div className="font-weight-bold">{this.state.incomeData.sys.weekly}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 animation mb-5 mb-md-0" data-animation="fadeInUp" data-animation-delay="1.2s">
                                <div className="pricebar__block text-center">
                                    <div className="pricebar__block__title">{t('income.income.monthly')}</div>
                                    <div className="pricebar__block__content">
                                        <div>{this.state.incomeData.usd.monthly}</div>
                                        <div>{this.state.incomeData.btc.monthly}</div>
                                        <div className="font-weight-bold">{this.state.incomeData.sys.monthly}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 animation" data-animation="fadeInUp" data-animation-delay="1.3s">
                            <div className="pricebar__block text-center">
                                <div className="pricebar__block__title">{t('income.income.yearly')}</div>
                                <div className="pricebar__block__content">
                                    <div>{this.state.incomeData.usd.yearly}</div>
                                    <div>{this.state.incomeData.btc.yearly}</div>
                                    <div className="font-weight-bold">{this.state.incomeData.sys.yearly}</div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="tabs-2" role="tabpanel">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3 animation mb-5 mb-lg-0" data-animation="fadeInUp" data-animation-delay="1s">
                                <div className="pricebar__block text-center">
                                    <div className="pricebar__block__title">{t('income.income.daily')}</div>
                                    <div className="pricebar__block__content">
                                        <div>{this.state.incomeSenOneYrData.usd.daily}</div>
                                        <div>{this.state.incomeSenOneYrData.btc.daily}</div>
                                        <div className="font-weight-bold">{this.state.incomeSenOneYrData.sys.daily}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 animation mb-5 mb-lg-0" data-animation="fadeInUp" data-animation-delay="1.1s">
                                <div className="pricebar__block text-center">
                                    <div className="pricebar__block__title">{t('income.income.weekly')}</div>
                                    <div className="pricebar__block__content">
                                        <div>{this.state.incomeSenOneYrData.usd.weekly}</div>
                                        <div>{this.state.incomeSenOneYrData.btc.weekly}</div>
                                        <div className="font-weight-bold">{this.state.incomeSenOneYrData.sys.weekly}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 animation mb-5 mb-md-0" data-animation="fadeInUp" data-animation-delay="1.2s">
                                <div className="pricebar__block text-center">
                                    <div className="pricebar__block__title">{t('income.income.monthly')}</div>
                                    <div className="pricebar__block__content">
                                        <div>{this.state.incomeSenOneYrData.usd.monthly}</div>
                                        <div>{this.state.incomeSenOneYrData.btc.monthly}</div>
                                        <div className="font-weight-bold">{this.state.incomeSenOneYrData.sys.monthly}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 animation" data-animation="fadeInUp" data-animation-delay="1.3s">
                                <div className="pricebar__block text-center">
                                    <div className="pricebar__block__title">{t('income.income.yearly')}</div>
                                    <div className="pricebar__block__content">
                                        <div>{this.state.incomeSenOneYrData.usd.yearly}</div>
                                        <div>{this.state.incomeSenOneYrData.btc.yearly}</div>
                                        <div className="font-weight-bold">{this.state.incomeSenOneYrData.sys.yearly}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        )
        } else {
            return(
                <p>{t('income.loading')}</p>
            )
        }

    }
}

export default withTranslation()(Income);
