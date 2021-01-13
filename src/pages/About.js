import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import MetaTags from "react-meta-tags";

import Background from "../components/global/Background";
import BackgroundInner from "../components/global/BackgroundInner";
import InnerBanner from "../components/global/InnerBanner";

var publicurl = process.env.PUBLIC_URL;

/**
 * Old About page
 * @component
 * @category Pages
 */
class About extends Component {
    render() {
    const { t } = this.props;
        return (
            <Background>
                <BackgroundInner />
                <main className="section aboutpage">
                    <MetaTags>
                        <title>{t("about.meta.title")}</title>
                        <meta name="keywords" content={t("about.meta.keywords")} />
                        {/* <meta name="description" content={t("about.meta.description")} /> */}
                    </MetaTags>
                    <div className="shell-large">
                        <div className="section__body">
                            <div className="articles">
                                <InnerBanner heading={t("about.title")} />
                                <section className="section_About bg-light">
                                <div className="container">
                                    <div className="row">
                                    <div className="col-lg-7 col-md-12 col-sm-12 order-2 order-lg-1">
                                        <div className="custom__about__left">
                                        <h3>
                                            {t("about.masternodes.question.p1")}{" "}
                                            <span className="text-primary">
                                            {t("about.masternodes.question.p2")}
                                            </span>
                                        </h3>
                                        <ul className="list-unstyled">
                                            <li>
                                            <i className="fa fa-angle-right pr-1"></i>{" "}
                                            {t("about.masternodes.featureList.f1")}
                                            </li>
                                            <li>
                                            <i className="fa fa-angle-right pr-1"></i>{" "}
                                            {t("about.masternodes.featureList.f2")}
                                            </li>
                                            <li>
                                            <i className="fa fa-angle-right pr-1"></i>{" "}
                                            {t("about.masternodes.featureList.f3")}
                                            </li>
                                            <li>
                                            <i className="fa fa-angle-right pr-1"></i>{" "}
                                            {t("about.masternodes.featureList.f4")}
                                            </li>
                                        </ul>
                                        <p>{t("about.masternodes.description.d1")}</p>
                                        <p>{t("about.masternodes.description.d2")}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-12 col-sm-12 mb-5 mb-lg-0 order-1 order-lg-2">
                                        <div className="about-img text-center text-lg-right">
                                        <img
                                            src={publicurl + "/assets/images/header-img1.png"}
                                            alt=""
                                            className="img-fluid"
                                        />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </section>

                                <section className="section_governance">
                                <div className="container">
                                    <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12 mb-5 mb-lg-0">
                                        <div className="about-img text-center text-lg-right">
                                        <img
                                            src={publicurl + "/assets/images/governance.png"}
                                            alt=""
                                            className="img-fluid"
                                        />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12">
                                        <div className="custom__about__left text-white text-center text-lg-left">
                                        <h3 className="text-white">{t("about.governance.title")}</h3>
                                        <p className="lead font-italic">
                                            {t("about.governance.question")}
                                        </p>
                                        <p>{t("about.governance.description.d1")}</p>
                                        <p>{t("about.governance.description.d2")}</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </section>

                                <section className="section_About bg-light">
                                <div className="container">
                                    <div className="row">
                                    <div className="col-lg-6 col-md-12 col-sm-12 order-2 order-lg-1">
                                        <div className="custom__about__left text-center text-lg-left">
                                        <h3>{t("about.rewards.title")}</h3>
                                        <p>{t("about.rewards.description.d1")}</p>
                                        <p>{t("about.rewards.description.d2")}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12 col-sm-12 mb-5 mb-lg-0 order-1 order-lg-2">
                                        <div className="about-img text-center text-lg-right">
                                        <img
                                            src={publicurl + "/assets/images/reward.png"}
                                            alt=""
                                            className="img-fluid"
                                        />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </section>

                                <section className="section_seniority pb-5">
                                <div className="container">
                                    <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="heading___bar text-center text-white mb-5">
                                        <h3 className="text-white">{t("about.seniority.title")}</h3>
                                        <p>{t("about.seniority.description")}</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="timeline section-box-margin">
                                        <div className="block block-left">
                                            <h3>{t("about.seniority.seniority.s1.title")}</h3>
                                            <p>{t("about.seniority.seniority.s1.d1")}</p>
                                            <p>{t("about.seniority.seniority.s1.d2")}</p>
                                        </div>

                                        <div className="block block-right mt-30">
                                            <h3>{t("about.seniority.seniority.s2.title")}</h3>
                                            <p>{t("about.seniority.seniority.s2.d1")}</p>
                                            <p>{t("about.seniority.seniority.s2.d2")}</p>
                                            <p>{t("about.seniority.seniority.s2.d3")}</p>
                                            <p>{t("about.seniority.seniority.s2.d4")}</p>
                                        </div>

                                        <div className="block block-left mt-30">
                                            <h3>{t("about.seniority.seniority.s3.title")}</h3>
                                            <p>{t("about.seniority.seniority.s3.d1")}</p>
                                            <p>{t("about.seniority.seniority.s3.d2")}</p>
                                            <p>{t("about.seniority.seniority.s3.d3")}</p>
                                        </div>

                                        <div className="block block-right mt-30">
                                            <h3>{t("about.seniority.seniority.s4.title")}</h3>
                                            <p>{t("about.seniority.seniority.s4.d1")}</p>
                                            <p>{t("about.seniority.seniority.s4.d2")}</p>
                                            <p>{t("about.seniority.seniority.s4.d3")}</p>
                                        </div>
                                        <div className="circle"></div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row my-5 justify-content-center">
                                    <div className="col-lg-10 col-md-12 col-sm-12 text-center text-white">
                                        <p>
                                        {t("about.seniority.note.n1.p1")}{" "}
                                        <b>{t("about.seniority.note.n1.p2")} </b>.{" "}
                                        {t("about.seniority.note.n1.p3")}{" "}
                                        <b>{t("about.seniority.note.n1.p4")}</b>{" "}
                                        {t("about.seniority.note.n1.p5")}
                                        </p>
                                        <p>{t("about.seniority.note.n2")}</p>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 text-center text-white">
                                        <h4 className="text-white">{t("about.requirements.title")}</h4>
                                        <ul className="list-unstyled Requirements__list mb-0">
                                        <li>
                                            <i className="fa fa-angle-right"></i>{" "}
                                            {t("about.requirements.requirement.r1")}
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right"></i>{" "}
                                            {t("about.requirements.requirement.r2")}
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right"></i>{" "}
                                            {t("about.requirements.requirement.r3")}
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right"></i>{" "}
                                            {t("about.requirements.requirement.r4")}
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right"></i>{" "}
                                            {t("about.requirements.requirement.r5")}
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right"></i>{" "}
                                            {t("about.requirements.requirement.r6")}
                                        </li>
                                        <li>
                                            <i className="fa fa-angle-right"></i>{" "}
                                            {t("about.requirements.requirement.r7")}
                                        </li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                                </section>

                            </div>
                        </div>

                    </div>
                </main>
            </Background>
        );
    }
}

export default withTranslation()(About);
