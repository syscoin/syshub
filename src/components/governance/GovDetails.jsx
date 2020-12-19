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
                            <div className="ministats mndata-governance">
                                <div className="stat">
                                    {t('superblocks.govdetailtable.current_superblock')}
                                    <div className="stat-data">{this.state.superBlockData.next_superblock}</div>
                                </div>
                                <div className="stat">
                                    {t('superblocks.govdetailtable.superblock_budget')}
                                    <div className="stat-data">{this.state.superBlockData.budget} SYS</div>
                                </div>
                                <div className="stat">
                                    {t('superblocks.govdetailtable.requested_superblock_budget')}
                                    <div className="stat-data">{this.state.budgetSum} SYS</div>
                                </div>
                                <div className="stat">
                                    {t('superblocks.govdetailtable.superblock_date_utc')}
                                    <div className="stat-data">{this.state.superBlockData.superblock_date}</div>
                                </div>
                                <div className="stat">
                                    {t('superblocks.govdetailtable.voting_deadline_utc')}
                                    <div className="stat-data">{this.state.superBlockData.voting_deadline}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col--size6">
                        <div className="article__content">
                            <h3 className="article__title title-border title-border--left title-border--blue">{t('superblocks.nextsuperblockstable.title')}</h3>
                            <div className="ministats mndata-governance">
                                <div className="stat">
                                    {this.state.superBlockData.sb1}
                                    <div className="stat-data">{this.state.superBlockData.sb1Budget} SYS</div>
                                    <div className="stat-data">{this.state.superBlockData.sb1Date}</div>
                                </div>
                                <div className="stat">
                                    {this.state.superBlockData.sb2}
                                    <div className="stat-data">{this.state.superBlockData.sb2Budget} SYS</div>
                                    <div className="stat-data">{this.state.superBlockData.sb2Date}</div>
                                </div>
                                <div className="stat">
                                    {this.state.superBlockData.sb3}
                                    <div className="stat-data">{this.state.superBlockData.sb3Budget} SYS</div>
                                    <div className="stat-data">{this.state.superBlockData.sb3Date}</div>
                                </div>
                                <div className="stat">
                                    {this.state.superBlockData.sb4}
                                    <div className="stat-data">{this.state.superBlockData.sb4Budget} SYS</div>
                                    <div className="stat-data">{this.state.superBlockData.sb4Date}</div>
                                </div>
                                <div className="stat">
                                    {this.state.superBlockData.sb5}
                                    <div className="stat-data">{this.state.superBlockData.sb5Budget} SYS</div>
                                    <div className="stat-data">{this.state.superBlockData.sb5Date}</div>
                                </div>
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
