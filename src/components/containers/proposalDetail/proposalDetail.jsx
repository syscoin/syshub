/* eslint-disable flowtype/require-valid-file-annotation */

//Import react/redux
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import API
import { fire } from '../../../API/firebase';

//Import UI Components
import Grid from '@material-ui/core/Grid';
import { DashBoardHeader } from '../../functionals';
import { ProposalPayment } from '../../functionals';
import { ProposalApprovalStat } from '../../functionals';
import { ProposalDescription } from '../../functionals';
import { ProposalComments } from '../../functionals';

// import components
import proposalDetailsStyle from './proposalDetails.style';

//Definition React Component
export class ProposalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.proposal,
      url: ''
    };
    this.setMoreInfoUrl = this.setMoreInfoUrl.bind(this);
  }

  componentWillMount() {
    const proposal = this.state.data;
    if (proposal) {
      const descriptionID = proposal.DataString[0][1].descriptionID;
      return fire
        .database()
        .ref('proposalsDescriptions/' + descriptionID)
        .once('value')
        .then(snapshot => {
          proposal.DataString[0][1].description = snapshot.val()
            ? snapshot.val().detail
            : proposal.DataString[0][1].description;
          this.setState({ data: proposal });
        });
    }
  }

  setMoreInfoUrl(url, propHash) {
    console.log('ACZ -->', url);
    console.log('ACZ -->', propHash);
    if (!!url && url !== this.props.globalConst.EMPTY_FIELD) {
      return url;
    }
    const origin = window.location.origin;
    const newUrl = `${origin}/p/${propHash}`;
    return newUrl;
  }

  render() {
    const { deviceType, totalNodes, proposal } = this.props;
    const dataString = this.state.data ? this.state.data.DataString[0][1] : '';
    const proposalTitle = this.state.data ? dataString.title || dataString.name : '';
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
  return {
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(ProposalDetail);
