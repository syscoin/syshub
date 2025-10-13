import React, { Component } from 'react';
import { withTranslation } from "react-i18next";

/**
 * Governance Details component
 * @component
 * @subcategory Governance
 * @example
 * const budgetSum = {}
 * const superBlockData = {}
 * return (
 *  <Govdetails superBlockData={superBlockData} budgetSum={budgetSum} />
 * )
 */
class Govdetails extends Component {
    /**
     * initialize the state
     * @constructor 
     * @param {*} props Needs superBlockData and budgetSum to work properly
     */
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            superBlockData: [],
            budgetSum: 0
        }
    }

    /**
     * Set the state of the data passed in props
     * @function 
     */
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
            return (
                <div className="cols-top cols">
                    <div className="col col--size6">
                        <div className="article__content">
                            <h3 className="article__title title-border title-border--left title-border--blue">{t('superblocks.govdetailtable.title')}</h3>
                            <div className="table-responsive">
                                <table className="table table--governance">
                                    <tbody>
                                        <tr>
                                            <td className="table-label">Current SuperBlock:</td>
                                            <td className="table-value">{this.state.superBlockData.next_superblock}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-label">SuperBlock Budget:</td>
                                            <td className="table-value">{this.state.superBlockData.budget} SYS</td>
                                        </tr>
                                        <tr>
                                            <td className="table-label">Requested SuperBlock Budget:</td>
                                            <td className="table-value">{this.state.budgetSum} SYS</td>
                                        </tr>
                                        <tr>
                                            <td className="table-label">SuperBlock Date (UTC):</td>
                                            <td className="table-value">{this.state.superBlockData.superblock_date}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-label">Voting Deadline (UTC):</td>
                                            <td className="table-value">{this.state.superBlockData.voting_deadline}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col col--size6">
                        <div className="article__content">
                            <h3 className="article__title title-border title-border--left title-border--blue">{t('superblocks.nextsuperblockstable.title')}</h3>
                            <div className="table-responsive">
                                <table className="table table--governance">
                                    <thead>
                                        <tr>
                                            <th>SuperBlock</th>
                                            <th>Budget</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="table-label">{this.state.superBlockData.sb1}</td>
                                            <td className="table-value">{this.state.superBlockData.sb1Budget.result} SYS</td>
                                            <td className="table-value">{this.state.superBlockData.sb1Date}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-label">{this.state.superBlockData.sb2}</td>
                                            <td className="table-value">{this.state.superBlockData.sb2Budget.result} SYS</td>
                                            <td className="table-value">{this.state.superBlockData.sb2Date}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-label">{this.state.superBlockData.sb3}</td>
                                            <td className="table-value">{this.state.superBlockData.sb3Budget.result} SYS</td>
                                            <td className="table-value">{this.state.superBlockData.sb3Date}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-label">{this.state.superBlockData.sb4}</td>
                                            <td className="table-value">{this.state.superBlockData.sb4Budget.result} SYS</td>
                                            <td className="table-value">{this.state.superBlockData.sb4Date}</td>
                                        </tr>
                                        <tr>
                                            <td className="table-label">{this.state.superBlockData.sb5}</td>
                                            <td className="table-value">{this.state.superBlockData.sb5Budget.result} SYS</td>
                                            <td className="table-value">{this.state.superBlockData.sb5Date}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <p>{t('investment.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Govdetails);
