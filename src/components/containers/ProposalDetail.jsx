/* eslint-disable flowtype/require-valid-file-annotation */

//Import react/redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import API
import { fire } from '../../API/firebase';

//Import UI Components
import Grid from '@material-ui/core/Grid';
import { DashBoardHeader } from '../functionals/';
import { ProposalPayment } from '../functionals/';
import { ProposalApprovalStat } from '../functionals/';
import { ProposalDescription } from '../functionals/';
import { ProposalComments } from '../functionals/';

// import components
import { proposalDetailsStyle } from './styles';

//Definition React Component
export class ProposalDetail extends Component {
  state = {
    data: this.props.proposal
  };

  componentWillMount() {
    const proposal = this.state.data;
    if (proposal) {
      const descriptionID = proposal.DataString[0][1].descriptionID;
      return fire
        .database()
        .ref('ProposalsDescriptions/' + descriptionID)
        .once('value')
        .then(snapshot => {
          proposal.DataString[0][1].description = snapshot.val()
            ? snapshot.val().detail
            : proposal.DataString[0][1].description;
          this.setState({ data: proposal });
        });
    }
  }

  render() {
    const { deviceType, totalNodes, proposal } = this.props;
    const dataString = proposal ? proposal.DataString[0][1] : '';
    const proposalTitle = proposal ? dataString.title || dataString.name : '';
    //Platform style switcher
    return (
      <div>
        {!proposal && <div> Proposal not found </div>}
        {proposal && (
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
              />
              <ProposalDescription
                deviceType={deviceType}
                description={dataString.description}
                url={dataString.url}
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
