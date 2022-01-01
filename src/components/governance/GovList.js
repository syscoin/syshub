import React, { Component } from 'react';
import GovListRow from './GovListRow';
import { withTranslation } from "react-i18next";

/**
 * Old Governance Table of Proposals, currently not in use
 * @component
 * @subcategory Governance
 * @example
 * const govData = []
 * const statsData = {}
 * return (
 *  <GovList statsData={statsData} govData={govData} />
 * )
 */
class GovList extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            govData: [],
            statsData: []
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            govData: this.props.govData,
            statsData: this.props.statsData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <>
                    <section className="section__Income__investment gradient_box2 pt-0">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 animation mb-5 mb-lg-0" data-animation="fadeInUp" data-animation-delay="1s">
                                    <div className="Heading__Bar mb-5">
                                        <h1 className="text-white font-weight-bold text-center">{t('govlist.table.title')}</h1>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table live__table table-bordered table-dark table-striped">
                                        <thead className="table-heading">
                                                <tr>
                                                    <th>{t('govlist.table.passing')}</th>
                                                    <th>{t('govlist.table.name')}</th>
                                                    <th>{t('govlist.table.created')}</th>
                                                    <th>{t('govlist.table.budget')}</th>
                                                    <th>{t('govlist.table.payment_period')}</th>
                                                    <th>{t('govlist.table.yes_votes')}</th>
                                                    <th>{t('govlist.table.no_votes')}</th>
                                                    <th>{t('govlist.table.net_yes_percent')}</th>
                                                    <th>{t('govlist.table.vote_command')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-body">
                                                {this.state.govData.map((value, index) => {
                                                    return <GovListRow key={index} govRowData={this.state.govData[index]} enableVal={this.state.statsData.enabled}/>
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )
        } else {
            return(
                <p>{t('govlist.loading')}</p>
            )
        }
    }
}

export default withTranslation()(GovList);
