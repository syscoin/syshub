/* eslint-disable flowtype/require-valid-file-annotation */

//Import react/redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import API
import { fire } from '../../../API/firebase/firebase';

//Import UI Components
import Grid from '@material-ui/core/Grid';
import { DashBoardHeader } from '../../functionals';
import { ProposalPayment } from '../../functionals';
import { ProposalApprovalStat } from '../../functionals';
import { ProposalDescription } from '../../functionals';
import { ProposalComments } from '../../functionals';

// Import Material-UI components
import LinearProgress from '@material-ui/core/LinearProgress';

// import components
import proposalDetailsStyle from './proposalDetails.style';

//Definition React Component
export class ProposalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataString: '',
      loading: true
    };
    this.setMoreInfoUrl = this.setMoreInfoUrl.bind(this);
  }

  async getProposalDescription(descriptionID) {
    const proposalDescriptionRef = fire
      .database()
      .ref(`proposalsDescriptions/${descriptionID}`);
    const rawProposalDescription = await proposalDescriptionRef.once('value');
    const proposalDescription = rawProposalDescription.val();
    return proposalDescription;
  }

  setMoreInfoUrl(url, propHash) {
    if (!!url && url !== this.props.globalConst.EMPTY_FIELD) {
      return url;
    }
    const origin = window.location.origin;
    const newUrl = `${origin}/p/${propHash}`;
    return newUrl;
  }

  async prepareDataString(proposal) {
    if (proposal) {
      const dataString = proposal.DataString[0][1];
      const descriptionID = dataString.descriptionID;
      const descriptionObj = await this.getProposalDescription(descriptionID);
      if (descriptionObj) {
        dataString.description = descriptionObj.detail;
      }
      this.setState({ dataString, loading: false });
    }
  }

  render() {
    const { deviceType, totalNodes, proposal } = this.props;
    const { dataString, loading } = this.state;
    const proposalTitle = this.state.dataString
      ? dataString.title || dataString.name
      : '';
    if (!dataString) {
      this.prepareDataString(proposal);
    }

    //Platform style switcher
    return (
      <div>
        {loading && <LinearProgress />}
        {!dataString && !loading && <div> Proposal not found </div>}
        {dataString && (
          <Grid style={proposalDetailsStyle.root}>
            <DashBoardHeader
              data={{
                showHeader: 'ProposalDetail',
                name: proposalTitle
              }}
              deviceType={deviceType}
            />

            <Grid
              container
              style={
                deviceType === 'mobile'
                  ? proposalDetailsStyle.proposalDetailsMRoot
                  : proposalDetailsStyle.proposalDetailsRoot
              }
            >
              {deviceType === 'mobile' ? (
                <h3 style={proposalDetailsStyle.proposalTitle}>
                  {' '}
                  Proposal Title:{' '}
                  <span style={{ padding: '0px 10px' }}>
                    {dataString.name}
                  </span>{' '}
                </h3>
              ) : null}
              <ProposalPayment deviceType={deviceType} data={dataString} />
              <ProposalApprovalStat
                deviceType={deviceType}
                proposal={proposal}
                totalNodes={totalNodes}
                passingPercentage={10}
              />
              <ProposalDescription
                deviceType={deviceType}
                description={dataString.description}
                url={this.setMoreInfoUrl(dataString.url, proposal.Hash)}
              />
              <ProposalComments
                deviceType={deviceType}
                data={{ proposalID: proposal.Hash }}
              />
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(ProposalDetail);
