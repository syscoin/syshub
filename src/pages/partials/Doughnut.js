import React, { Component } from 'react';
import AnyChart from 'anychart-react';
import { withTranslation } from "react-i18next";

export class Doughnut extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            chart1_details: [],
            chart1_mid: "",
            chart2_details: [],
            chart2_mid: ""
        }
    }

    componentDidMount() {
        this.loadCharts(this.props.chartData);
    }
    formatNumber = (number) => {
        return Number(number.toString().replace(/,/g, ''));
    }
    loadCharts(response) {
        const { t } = this.props;
        var total_enabled=this.formatNumber(response.enabled);
        var total_new_start=this.formatNumber(response.new_start_required);
        var total_sent=this.formatNumber(response.sentinel_ping_expired);
        var final=total_enabled+total_new_start+total_sent;

        var total_locked=this.formatNumber(response.total_locked);
        var rem_supply=this.formatNumber(response.current_supply)-this.formatNumber(response.total_locked);
        var coins_percent_locked=response.coins_percent_locked;

        this.setState({
            dataload: 1,
            chart1_details: [
                {x: t('doughnut.charts.masterNodes.enabled'), value: total_enabled, fill:'#ee6c01'},
                {x: t('doughnut.charts.masterNodes.startRequired'), value: total_new_start, fill:'#0b209a'},
                {x: t('doughnut.charts.masterNodes.pingExpired'), value: total_sent, fill:'#fff'},
            ],
            chart1_mid: final,
            chart2_details: [
                {x: t('doughnut.charts.coinsLocked.coinLocked'), value: total_locked, fill:'#ee6c01', tooltip_text:"1000 coins locked"},
                {x: t('doughnut.charts.coinsLocked.remainingSupply'), value: rem_supply, fill:'#0b209a', tooltip_text:"9000 supply remaining"}
            ],
            chart2_mid: coins_percent_locked
        });
    }
    render() {
        const { t } = this.props;
        var chart1_settings = {
            id: "firstChart",
            width: "100%",
            background:'transparent',
            height: 600,
            type: 'pie',
            data: this.state.chart1_details,
            innerRadius: '75%',
            label: {
              text: this.state.chart1_mid,
              width: "100%",
              height: "100%",
              fontSize: '45px',
              fontColor: "#fff",
              hAlign: 'center',
              vAlign: 'middle'
            },
            title: {
                text: t('doughnut.charts.masterNodes.title'),
                fontColor: "#fff",
                fontWeight: 'bold'
            }
        };
        var chart2_settings = {
            id: "secondChart",
            width: "100%",
            background:'transparent',
            height: 600,
            type: 'pie',
            data: this.state.chart2_details,
            innerRadius: '75%',
            label: {
              text: this.state.chart2_mid,
              width: "100%",
              height: "100%",
              fontSize: '45px',
              fontColor: "#fff",
              hAlign: 'center',
              vAlign: 'middle'
            },
            title: {
                text: t('doughnut.charts.coinsLocked.title'),
                fontColor: "#fff",
                fontWeight: 'bold'
            }
        };
        if(this.state.dataload===1) {
        return(
            <section className="section_charts gradient_box2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="Heading__Bar text-center mb-5">

                        </div>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <AnyChart {...chart1_settings}/>
                    </div>
                    <div className="col-lg-6">
                        <AnyChart {...chart2_settings}/>
                    </div>
                </div>
            </div>
        </section>
        )
        } else {
            return(
                <p>{t('doughnut.loading')}...</p>
            )
        }
    }
}

export default withTranslation()(Doughnut);
