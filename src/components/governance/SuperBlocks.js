import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

export class SuperBlocks extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            superBlockData: [],
            budgetSum: 0
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            superBlockData: this.props.superBlockData,
            budgetSum: this.props.budgetSum
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
        return(
            <section className="section__Income__investment gradient_box2 pt-0">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-6 animation" data-animation="fadeInUp" data-animation-delay="1.1s">
                        <div className="Heading__Bar mb-3">
                            <h2 className="text-white font-weight-normal text-center">{t('superblocks.govdetailtable.title')}</h2>
                        </div>
                        <div className="table-responsive">
                            <table className="table live__table table-bordered table-dark table-striped">
                                <thead className="table-heading">
                                    <tr>
                                        <th>{t('superblocks.govdetailtable.label')}</th>
                                        <th>{t('superblocks.govdetailtable.value')}</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>{t('superblocks.govdetailtable.current_superblock')}</td>
                                        <td>{this.state.superBlockData.next_superblock}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('superblocks.govdetailtable.superblock_budget')}</td>
                                        <td>{this.state.superBlockData.budget}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('superblocks.govdetailtable.requested_superblock_budget')}</td>
                                        <td>{this.state.budgetSum}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('superblocks.govdetailtable.superblock_date_utc')}</td>
                                        <td>{this.state.superBlockData.superblock_date}</td>
                                    </tr>
                                    <tr>
                                        <td>{t('superblocks.govdetailtable.voting_deadline_utc')}</td>
                                        <td>{this.state.superBlockData.voting_deadline}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 animation mb-5 mb-lg-0" data-animation="fadeInUp" data-animation-delay="1s">
                        <div className="Heading__Bar mb-3">
                            <h2 className="text-white font-weight-normal text-center">{t('superblocks.nextsuperblockstable.title')}</h2>
                        </div>
                        <div className="table-responsive">
                            <table className="table live__table table-bordered table-dark table-striped">
                            <thead className="table-heading">
                                    <tr>
                                        <th>{t('superblocks.nextsuperblockstable.superblock')}</th>
                                        <th>{t('superblocks.nextsuperblockstable.budget_amount')}</th>
                                        <th>{t('superblocks.nextsuperblockstable.estimate_time_utc')}</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>{this.state.superBlockData.sb1}</td>
                                        <td>{this.state.superBlockData.sb1Budget+' SYS'}</td>
                                        <td>{this.state.superBlockData.sb1Date}</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.superBlockData.sb2}</td>
                                        <td>{this.state.superBlockData.sb2Budget+' SYS'}</td>
                                        <td>{this.state.superBlockData.sb2Date}</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.superBlockData.sb3}</td>
                                        <td>{this.state.superBlockData.sb3Budget+' SYS'}</td>
                                        <td>{this.state.superBlockData.sb3Date}</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.superBlockData.sb4}</td>
                                        <td>{this.state.superBlockData.sb4Budget+' SYS'}</td>
                                        <td>{this.state.superBlockData.sb4Date}</td>
                                    </tr>
                                    <tr>
                                        <td>{this.state.superBlockData.sb5}</td>
                                        <td>{this.state.superBlockData.sb5Budget+' SYS'}</td>
                                        <td>{this.state.superBlockData.sb5Date}</td>
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

export default withTranslation()(SuperBlocks);
