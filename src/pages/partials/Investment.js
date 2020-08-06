import React, { Component } from 'react';

export class Investment extends Component {
    constructor(props){  
        super(props);  
        this.state = {  
            dataload: 0,
            investData: [],
            blockchainData: []
        }
    }
    componentDidMount() {
        this.setState({ 
            dataload: 1, 
            investData: this.props.investData,
            blockchainData: this.props.blockchainData
        });
    }
    render() {
        if(this.state.dataload===1) {
        return(
            <section className="section__Income__investment gradient_box2 pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 animation mb-5 mb-lg-0" data-animation="fadeInUp" data-animation-delay="1s">
                        <div className="Heading__Bar mb-5">
                            <h1 className="text-white font-weight-bold text-center">Investment Stats</h1>
                        </div>
                        <div className="table-responsive">
                            <table className="table live__table table-bordered table-dark table-striped">
                            <thead className="table-heading">
                                    <tr>
                                        <th>Label</th>    
                                        <th>Value</th>       
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>Coins Required</td>
                                        <td>{this.state.investData.collateral_req}</td>
                                    </tr>
                                    <tr>
                                        <td>Masternode Price</td>
                                        <td>${this.state.investData.masternode_price_usd}</td>
                                    </tr>
                                    <tr>
                                        <td>ROI</td>
                                        <td>{this.state.investData.roi}</td>
                                    </tr>
                                    <tr>
                                        <td>Approx. Payout Frequency</td>
                                        <td>{this.state.investData.payout_frequency}</td>
                                    </tr>
                                    <tr>
                                        <td>Approx. First Payment</td>
                                        <td>{this.state.investData.first_pay}</td>
                                    </tr>
                                    <tr>
                                        <td>Approx. Reward Eligibility</td>
                                        <td>{this.state.investData.reward_eligble}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 animation" data-animation="fadeInUp" data-animation-delay="1.1s">
                        <div className="Heading__Bar mb-5">
                            <h1 className="text-white font-weight-bold text-center">Blockchain Stats</h1>
                        </div>
                        <div className="table-responsive">
                            <table className="table live__table table-bordered table-dark table-striped">
                                <thead className="table-heading">
                                    <tr>
                                        <th>Label</th>    
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    <tr>
                                        <td>Version</td>
                                        <td>{this.state.blockchainData.version}</td>
                                    </tr>
                                    <tr>
                                        <td>Sub version</td>
                                        <td>{this.state.blockchainData.sub_version}</td>
                                    </tr>
                                    <tr>
                                        <td>Protocol</td>
                                        <td>{this.state.blockchainData.protocol}</td>
                                    </tr>
                                    <tr>
                                        <td>Connections</td>
                                        <td>{this.state.blockchainData.connections}</td>
                                    </tr>
                                    <tr>
                                        <td>Genesis Block</td>
                                        <td>{this.state.blockchainData.genesis}</td>
                                    </tr>
                                    <tr>
                                        <td>Average Block Time</td>
                                        <td>{this.state.blockchainData.avg_block}</td>
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
                <p>Data is being loaded..</p>
            )
        }
    }
}

export default Investment;