import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

export class PriceLineChart extends Component {
    render() {
        const { t } = this.props;
        return(
            <section className="section__masternode gradient_box2 pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-12" data-animation="fadeInUp" data-animation-delay="1s">
                        <div className="Heading__Bar mb-5 text-center">
                            <h1 className="text-white display-4 font-weight-normal">{t('priceLineChart.title')}</h1>
                        </div>
                        <div id="linechart"></div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default withTranslation()(PriceLineChart);
