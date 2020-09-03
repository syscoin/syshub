/* eslint-disable flowtype/require-valid-file-annotation */

//Import react/redux
import React, { Component } from "react";
import { connect } from "react-redux";

//Import UI Components
import Grid from "@material-ui/core/Grid";

//Import custom Components
import {
  DashBoardHeader,
  ProposalOwner,
  ProposalPayment,
  ProposalApprovalStat,
  ProposalDescription,
  // ProposalComments
} from "../../functionals";

// Import Material-UI components
import LinearProgress from "@material-ui/core/LinearProgress";

// import components
import proposalDetailsStyle from "./proposalDetails.style";

//Definition React Component
export class ProposalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataString: "",
      loading: true
    };
    this.setMoreInfoUrl = this.setMoreInfoUrl.bind(this);
  }

  firebase = this.props.firebase;

  setMoreInfoUrl(url) {
    if (!!url && url !== this.props.globalConst.EMPTY_FIELD) {
      return url;
    }
    return null;
  }

  setProposalUrl(propHash) {
    const origin = window.location.origin;
    const proposalUrl = `${origin}/p/${propHash}`;
    return proposalUrl;
  }

  async prepareDataString(proposal) {
    // console.log("ACZ proposal -->", proposal);
    if (proposal) {
      const dataString = proposal.DataString[0][1];
      const descriptionID = dataString.descriptionID;
      const descriptionObj = await this.firebase.getProposalDescription(
        descriptionID
      );
      if (descriptionObj) {
        dataString.description = descriptionObj.detail;
      }
      dataString.collateralHash = proposal.CollateralHash;
      dataString.funded = proposal.fCachedFunding;
      this.setState({ dataString, loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { deviceType, totalNodes, proposal } = this.props;
    const { dataString, loading } = this.state;
    const proposalTitle = this.state.dataString
      ? dataString.title || dataString.name
      : "";

    if (!dataString && loading) {
      this.prepareDataString(proposal);
    }
    //Platform style switcher
    return (
      <div>
        {loading && <LinearProgress />}
        {/*this is rendered when proposal are not found in the governance objects list*/
        !dataString && !loading && <div />}
        {dataString && !loading && (
          <Grid style={proposalDetailsStyle.root}>
            <DashBoardHeader
              data={{
                showHeader: "ProposalDetail",
                name: proposalTitle
              }}
              deviceType={deviceType}
            />
            <Grid
              container
              style={
                deviceType === "mobile"
                  ? proposalDetailsStyle.proposalDetailsMRoot
                  : proposalDetailsStyle.proposalDetailsRoot
              }
            >
              {deviceType === "mobile" ? (
                <h3 style={proposalDetailsStyle.proposalTitle}>
                  {" "}
                  Proposal Title:{" "}
                  <span style={{ padding: "0px 10px" }}>
                    {dataString.name}
                  </span>{" "}
                </h3>
              ) : null}
              <ProposalOwner deviceType={deviceType} data={dataString} />
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
                moreInfoUrl={this.setMoreInfoUrl(dataString.url)}
                proposalUrl={this.setProposalUrl(proposal.Hash)}
              />
              {/*<ProposalComments*/}
              {/*  deviceType={deviceType}*/}
              {/*  data={{ proposalID: proposal.Hash }}*/}
              {/*/>*/}
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

export default connect(stateToProps, dispatchToProps)(ProposalDetail);
