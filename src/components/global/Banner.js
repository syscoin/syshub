import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";

var publicurl=process.env.PUBLIC_URL ?? '__PUBLIC_URL__';

/**
 * Component that shows the old banner of sysnode
 * @subcategory Global
 * @component
 */
class Banner extends Component {
    render() {
        const { t } = this.props;
        return(
            <section className="section_banner gradient_box2">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 col-sm-12 order-lg-first">
                        <div className="banner_text text-center text-lg-left ">
                            <h1 className="animation display-3" data-animation="fadeInUp" data-animation-delay="1.1s">{t('banner.title')}</h1>
                            <p className="animation" data-animation="fadeInUp" data-animation-delay="1.3s"> {t('banner.info')} </p>
                            <div className="btn_group animation mt-4" data-animation="fadeInUp" data-animation-delay="1.4s">
                                <Link to="/about" className="btn btn-default btn-radius content-popup">{t('banner.learnMore')}<i className="fa fa-long-arrow-right pl-3"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 order-first mb-5 mb-lg-0">
                        <div className="banner_image_right res_md_mb_50 res_xs_mb_20 animation bounceimg text-center" data-animation-delay="1.5s" data-animation="fadeInRight">
                            <img className="img-fluid" alt="banner_vector6" src={publicurl+'/assets/images/masternode.png'}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default withTranslation()(Banner);
