import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import SubTitle from '../global/SubTitle';

export class Income extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            incomeData: [],
            incomeSenOneYrData: [],
            incomeSenTwoYrData: []
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            incomeData: this.props.incomeData,
            incomeSenOneYrData: this.props.incomeSenOneYrData,
            incomeSenTwoYrData: this.props.incomeSenTwoYrData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
        return(
            <>
                <SubTitle heading={t('income.title')} />
                <div className="table-resp">
                    <div className="check_table">
                        <table className="seniority">
                        <thead>
                            <tr>
                            <td>Seniority</td>
                            <td>Daily</td>
                            <td>Weekly</td>
                            <td>Monthly</td>
                            <td>Yearly</td>
                            {/* <td>ROI</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Less than 1 Year</td>
                            <td>
                                {this.state.incomeData.usd.daily}
                                <br />
                                {this.state.incomeData.btc.daily}
                                <br />
                                <span className="sb">{this.state.incomeData.sys.daily}</span>
                            </td>
                            <td>
                                {this.state.incomeData.usd.weekly}
                                <br />
                                {this.state.incomeData.btc.weekly}
                                <br />
                                <span className="sb">{this.state.incomeData.sys.weekly}</span>
                            </td>
                            <td>
                                {this.state.incomeData.usd.monthly}
                                <br />
                                {this.state.incomeData.btc.monthly}
                                <br />
                                <span className="sb">{this.state.incomeData.sys.monthly}</span>
                            </td>
                            <td>
                                {this.state.incomeData.usd.yearly}
                                <br />
                                {this.state.incomeData.btc.yearly}
                                <br />
                                <span className="sb">{this.state.incomeData.sys.yearly}</span>
                            </td>
                            {/* <td>6.7%</td> */}
                            </tr>
                            <tr>
                            <td>1+ Year</td>
                            <td>
                                {this.state.incomeSenOneYrData.usd.daily}
                                <br />
                                {this.state.incomeSenOneYrData.btc.daily}
                                <br />
                                <span className="sb">{this.state.incomeSenOneYrData.sys.daily}</span>
                            </td>
                            <td>
                                {this.state.incomeSenOneYrData.usd.weekly}
                                <br />
                                {this.state.incomeSenOneYrData.btc.weekly}
                                <br />
                                <span className="sb">{this.state.incomeSenOneYrData.sys.weekly}</span>
                            </td>
                            <td>
                                {this.state.incomeSenOneYrData.usd.monthly}
                                <br />
                                {this.state.incomeSenOneYrData.btc.monthly}
                                <br />
                                <span className="sb">{this.state.incomeSenOneYrData.sys.monthly}</span>
                            </td>
                            <td>
                                {this.state.incomeSenOneYrData.usd.yearly}
                                <br />
                                {this.state.incomeSenOneYrData.btc.yearly}
                                <br />
                                <span className="sb">{this.state.incomeSenOneYrData.sys.yearly}</span>
                            </td>
                            {/* <td>6.7%</td> */}
                            </tr>
                            <tr>
                            <td>2.5+ Years</td>
                            <td>
                                {this.state.incomeSenTwoYrData.usd.daily}
                                <br />
                                {this.state.incomeSenTwoYrData.btc.daily}
                                <br />
                                <span className="sb">{this.state.incomeSenTwoYrData.sys.daily}</span>
                            </td>
                            <td>
                                {this.state.incomeSenTwoYrData.usd.weekly}
                                <br />
                                {this.state.incomeSenTwoYrData.btc.weekly}
                                <br />
                                <span className="sb">{this.state.incomeSenTwoYrData.sys.weekly}</span>
                            </td>
                            <td>
                                {this.state.incomeSenTwoYrData.usd.monthly}
                                <br />
                                {this.state.incomeSenTwoYrData.btc.monthly}
                                <br />
                                <span className="sb">{this.state.incomeSenTwoYrData.sys.monthly}</span>
                            </td>
                            <td>
                                {this.state.incomeSenTwoYrData.usd.yearly}
                                <br />
                                {this.state.incomeSenTwoYrData.btc.yearly}
                                <br />
                                <span className="sb">{this.state.incomeSenTwoYrData.sys.yearly}</span>
                            </td>
                            {/* <td>6.7%</td> */}
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
        } else {
            return(
                <p>{t('income.loading')}</p>
            )
        }

    }
}

export default withTranslation()(Income);
