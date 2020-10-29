import React, { Component } from 'react';
import { withTranslation } from "react-i18next";
import SubTitle from '../global/SubTitle';

class Blockchain extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataload: 0,
            blockchainData: []
        }
    }
    componentDidMount() {
        this.setState({
            dataload: 1,
            blockchainData: this.props.blockchainData
        });
    }
    render() {
        const { t } = this.props;
        if(this.state.dataload===1) {
            return (
                <>
                    <SubTitle heading={t('investment.blockchainTable.title')} />
                    <div className="ministats mndata-expanded">
                        <div className="stat">
                            {t('investment.blockchainTable.version')}
                            <div className="stat-data">{this.state.blockchainData.version}</div>
                            <div className="stat-data">{this.state.blockchainData.sub_version}</div>
                        </div>
                        <div className="stat">
                            {t('investment.blockchainTable.protocol')}
                            <div className="stat-data">{this.state.blockchainData.protocol}</div>
                        </div>
                        <div className="stat">
                            {t('investment.blockchainTable.genesisBlock')}
                            <div className="stat-data">{this.state.blockchainData.genesis}</div>
                        </div>
                        <div className="stat">
                            {t('investment.blockchainTable.averageBlockTime')}
                            <div className="stat-data">{this.state.blockchainData.avg_block}</div>
                        </div>
                    </div>
                </>
            )
        } else {
            return(
                <p>{t('investment.loading')}</p>
            )
        }
    }
}

export default withTranslation()(Blockchain);
