import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import { withTranslation } from "react-i18next";
export class Error extends Component {
    render() {
        const { t } = this.props;
        return(
            <main className="aboutpage">
   <MetaTags>
      <title>{t('error.meta.title')}</title>
      <meta name="keywords" content={t('error.meta.keywords')} />
      <meta name="description" content={t('error.meta.description')} />
   </MetaTags>
   <section className="section_governance">
      <div className="container">
         <div className="row">
            <div className="col-12 col-sm-12">
               <div className="custom__about__left text-white text-center text-lg-left">
                  <h3 className="text-white text-center">{t('error.title')}</h3>
               </div>
            </div>
         </div>
      </div>
   </section>
</main>
        )
    }
}

export default withTranslation()(Error);
