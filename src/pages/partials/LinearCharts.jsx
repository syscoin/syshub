import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class LinearChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        dataload: 0,
        chart1_details: [],
        chart1_mid: "",
        chart2_details: [],
        chart2_mid: "",
        dataChart1: {},
        dataChart2: {},
        };
    }

    componentDidMount() {
        this.loadCharts(this.props.chartData);
    }

    formatNumber = (number) => {
        return Number(number.toString().replace(/,/g, ""));
    }

    round(value, precision) {
        let multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    loadCharts(response) {
        let totalEnabled = this.formatNumber(response.enabled);
        let totalNewStart = this.formatNumber(response.new_start_required);
        let totalSent = this.formatNumber(response.sentinel_ping_expired);
        let totalMN = totalEnabled + totalNewStart + totalSent;

        let enabledPercent = `${this.round((totalEnabled / totalMN) * 100, 2)}%`;
        let newStartPercent = `${this.round((totalNewStart / totalMN) * 100, 2)}%`;
        let sentPercent = `${this.round((totalSent / totalMN) * 100, 2)}%`;

        let totalLocked = this.formatNumber(response.total_locked);
        let remSupply = this.formatNumber(response.current_supply) - this.formatNumber(response.total_locked);
        let coinsPercentLocked = response.coins_percent_locked;
        let totalCoins = totalLocked + remSupply;
        let lockedPercent = `${this.round((totalLocked / totalCoins) * 100, 2)}%`;
        let remPercent = `${this.round((remSupply / totalCoins) * 100, 2)}%`;

        this.setState({
        dataload: 1,
        dataChart1: {
            totalMN,
            totalEnabled,
            enabledPercent,
            totalNewStart,
            newStartPercent,
            totalSent,
            sentPercent
        },
        dataChart2: {
            totalLocked,
            lockedPercent,
            remSupply,
            remPercent,
            coinsPercentLocked,
        },
        });
    }
    render() {
        const { t } = this.props;
        const { dataChart1, dataChart2 } = this.state;

        if (this.state.dataload === 1) {
            return (
            <>
                <div className="ministats">
                    <div className="subtitle">Total masternodes ({2122})</div>
                    <div className="chart-mini-hor">
                        <div className="blue" style={{ width: dataChart1.enabledPercent }}></div>
                        <div className="red" style={{ width: dataChart1.newStartPercent }}></div>
                        <div className="white" style={{ width: dataChart1.sentPercent }}></div>
                    </div>
                    <div className="char-mini-legend">
                        <span>
                        <span className="blue"></span> Enabled{" "}
                        <span className="sb">{dataChart1.enabledPercent}</span>
                        </span>
                        <span>
                        <span className="red"></span> NSR{" "}
                        <span className="sb">{dataChart1.newStartPercent}</span>
                        </span>
                        <span>
                        <span className="white"></span> SPE{" "}
                        <span className="sb">{dataChart1.sentPercent}</span>
                        </span>
                    </div>
                </div>

                <div className="ministats">
                    <div className="subtitle">Coins collaterized</div>
                    <div className="chart-mini-hor">
                        <div className="blue" style={{ width: dataChart2.lockedPercent }}></div>
                        <div className="red" style={{ width: dataChart2.remPercent }}></div>
                    </div>
                    <div className="char-mini-legend">
                        <span>
                        <span className="blue"></span> Locked{" "}
                        <span className="sb">{dataChart2.lockedPercent}</span>
                        </span>
                        <span>
                        <span className="red"></span> Remaining supply{" "}
                        <span className="sb">{dataChart2.remPercent}</span>
                        </span>
                    </div>
                </div>
            </>
        );
        } else {
        return <p>{t("doughnut.loading")}...</p>;
        }
    }
}

export default withTranslation()(LinearChart);
