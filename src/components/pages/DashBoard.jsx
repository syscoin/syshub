import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { Grid } from '@material-ui/core';
import { Icon } from 'antd';
import { ProposalList } from '../containers/ProposalList';
import { ProposalDetail } from '../containers/ProposalDetail';

// import components
import injectSheet from 'react-jss';
import { dashboardStyle } from './styles';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalID: ''
    };
    this.handleDashboard = this.handleDashboard.bind(this);
  }

  componentWillMount() {}

  async componentDidMount() {
    await this.props.getProposals();
    this.selectProposalByHash(this.props.selectedProposal);
  }

  selectProposalByHash(propHash) {
    const { proposals } = this.props;
    // this.props.setProposalContainer('dashBoard');
    if (proposals) {
      const proposalList = proposals.list;
      const selectedProp = proposalList.filter(
        item => item.Hash === propHash
      )[0];
      this.setState({
        proposalID: selectedProp
      });

      // alert(propHash);
    }
  }

  //changing state with this function
  handleDashboard(value) {
    const container =
      this.props.showContainer === 'dashBoard' ? 'proposalDetail' : 'dashBoard';
    this.props.setProposalContainer(container);
    if (value) {
      this.props.setProposalShow(value.Hash);
      this.setState({
        proposalID: value
      });
    }
  }

  render() {
    const {
      classes,
      proposals,
      deviceType,
      showContainer,
      appConstants
    } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid className={style}>
        <h1 className="proposal-heading">PROPOSAL DASHBOARD</h1>
        {showContainer === 'proposalDetail' && (
          <div className="iconWraper" onClick={() => this.handleDashboard()}>
            <Icon type="backward" className="icon" />
            <span className="iconTxt">{`  Back to List`}</span>
          </div>
        )}
        {
          {
            dashBoard: (
              <ProposalList
                deviceType={this.props.deviceType}
                selectProposal={this.handleDashboard}
                proposalList={proposals.list}
                totalNodes={this.props.totalNodes}
                currentUser={this.props.currentUser}
                globalConst={appConstants}
              />
            ),
            proposalDetail: (
              <ProposalDetail
                deviceType={this.props.deviceType}
                proposal={this.state.proposalID}
                totalNodes={this.props.totalNodes}
                globalConst={appConstants}
              />
            )
          }[showContainer]
        }
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    proposals: state.proposals,
    //    totalNodes: state.sysStats.value.general.registered_masternodes_verified * 0.1,
    totalNodes: Math.floor(state.sysStats.mnCount * 0.1) + 1,
    currentUser: state.app.currentUser,
    showContainer: state.app.dashBoard.showContainer,
    selectedProposal: state.app.dashBoard.selectedProposal,
    appConstants: state.app.globalConst
  };
};

const dispatchToProps = dispatch => {
  return {
    getProposals: () => dispatch(actions.getProposals()),
    setProposalContainer: container =>
      dispatch(actions.setProposalContainer(container)),
    setProposalShow: propHash => dispatch(actions.setProposalShow(propHash))
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(injectSheet(dashboardStyle)(DashBoard));
