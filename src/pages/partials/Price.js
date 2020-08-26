import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

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
        return(
            <section className="section__Income__price bg-cover pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="Heading__Bar text-center mb-5">
                            <h1 className="text-white display-4 animation font-weight-bold" data-animation="fadeInUp" data-animation-delay="1s">{t('price.title')}</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-12 animation" data-animation="fadeInUp" data-animation-delay="1.3s">
                        <div className="table-responsive">
                            <table className="table live__table table-bordered table-dark table-striped">
                                <thead className="table-heading">
                                    <tr>
                                        <th>{t('price.priceTable.price')}</th>
                                        <th>{t('price.priceTable.volume')}</th>
                                        <th>{t('price.priceTable.marketcap')}</th>
                                        <th>{t('price.priceTable.change')}</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>${this.state.priceData.price_usd}</td>
                                        <td>${this.state.priceData.volume_usd}</td>
                                        <td>${this.state.priceData.market_cap_usd}</td>
                                        <td>{this.priceWizard(this.state.priceData.price_change)}</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.priceData.price_btc} BTC</td>
                                        <td>{this.state.priceData.volume_btc} BTC</td>
                                        <td>{this.state.priceData.market_cap_btc} BTC</td>
                                        <td></td>
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
                <p>{t('price.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Price);
