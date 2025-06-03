import React, { Component } from "react";
import { withTranslation } from "react-i18next";

/**
 * Component to show the stats data
 * @component
 * @subcategory Stats
 * @param {*} props t from withTranslation and statsData
 * @example
 * const statsData = {}
 * return (
 *  <StatsShow statsData={statsData} />
 * )
 */
class StatsShow extends Component {
  /**
   * initialize the state
   * @property {Object}
   */
  state = {
    dataload: 0,
    statsData: [],
  };

  /**
   * DidMount to set the state
   * @function
   */
  componentDidMount() {
    this.setState({
      dataload: 1,
      statsData: this.props.statsData,
    });
  }

  render() {
    const { statsData } = this.state;

    if (this.state.dataload === 1) {
      return (
        <>
          <div className="ministats mndata">
            <div className="stat">
              Collateral
              <div className="stat-data">
                {statsData.mn_stats.collateral_req} SYS
              </div>
            </div>
            <div className="stat">
              MN Cost
              <div className="stat-data">
                {statsData.mn_stats.masternode_price_usd}
              </div>
            </div>
            <div className="stat">
              ROI
              <div className="stat-data">
                <span title="Return on investment">
                  {statsData.mn_stats.roi}
                </span>
              </div>
            </div>
            <div className="stat">
              Monthly income
              <div className="stat-data">
                <span title="Regular SentryNode">
                  {statsData.income_stats.usd.monthly}
                </span>{" "}
                /{" "}
                <span title="SentryNode with 1 year seniority">
                  {statsData.income_stats_seniority_one_year.usd.monthly}
                </span>
              </div>
            </div>
            <div className="stat">
              First reward
              <div className="stat-data">{statsData.mn_stats.first_pay}</div>
            </div>
            <div className="stat">
              Reward elegibility
              <div className="stat-data">
                {statsData.mn_stats.reward_eligble}
              </div>
            </div>
            <div className="stat">
              SentryNodes
              <div className="stat-data">
                <span title="Enabled SentryNodes">
                  {statsData.mn_stats.enabled}
                </span>{" "}
                /{" "}
                <span title="All SentryNodes">{statsData.mn_stats.total}</span>
              </div>
            </div>
            <div className="stat">
              SYS collateralized
              <div className="stat-data">
                {statsData.mn_stats.coins_percent_locked}
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default withTranslation()(StatsShow);
