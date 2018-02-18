/* eslint-disable flowtype/require-valid-file-annotation */

//Import react/redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import API
import { fire } from '../../API/firebase';

//Import UI Components
import { Grid } from 'material-ui';
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
    data: this.props.proposal,
  };

  componentWillMount() {
    const proposal = this.state.data;
    const descriptionID = proposal.DataString[0][1].descriptionID;
    return fire.database()
      .ref('ProposalsDescriptions/' + descriptionID)
      .once('value')
      .then(snapshot => {
        proposal.DataString[0][1].description = snapshot.val() || proposal.DataString[0][1].description;
        this.setState({ data: proposal });
      }
      )
  }

  render() {
    const { deviceType, totalNodes } = this.props;
    const proposalTitle =
      this.state.data.DataString[0][1].title ||
      this.state.data.DataString[0][1].name;
    //Platform style switcher
    return (
      <Grid style={proposalDetailsStyle.root}>

        <DashBoardHeader
          data={{
            showHeader: 'ProposalDetail',
            name: proposalTitle
          }}
          deviceType={deviceType}
        />

        <Grid container style={deviceType === 'mobile' ? proposalDetailsStyle.proposalDetailsMRoot : proposalDetailsStyle.proposalDetailsRoot}>
          {deviceType === 'mobile' ?
            <h3 style={proposalDetailsStyle.proposalTitle}> Proposal Title: <span style={{ padding: '0px 10px' }}>{this.state.data.DataString[0][1].name}</span>  </h3>
            : null
          }
          <ProposalPayment
            deviceType={deviceType}
            data={this.state.data.DataString[0][1]}
          />
          <ProposalApprovalStat
            deviceType={deviceType}
            proposal={this.state.data}
            totalNodes={totalNodes}
          />
          <ProposalDescription
            deviceType={deviceType}
            description={this.state.data.DataString[0][1].description}
          />
          <ProposalComments
            deviceType={deviceType}
            data={{ proposalID: this.state.data.Hash }}
          />
        </Grid>
      </Grid>
    );
  }
}
const stateToProps = state => {
  return {
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(ProposalDetail);
