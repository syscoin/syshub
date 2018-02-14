import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import PropTypes from 'prop-types';
import { Grid, withStyles } from 'material-ui';
import { Icon } from 'antd';
import { ProposalList } from '../containers/ProposalList';
import { ProposalDetail } from '../containers/ProposalDetail';

// import components
import { dashboardStyle } from './styles';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContainer: 'dashBoard',
      proposalID: ''
    };
    this.handleDashboard = this.handleDashboard.bind(this);
  }

  componentDidMount() {
    this.props.getProposals();
  }
  //changing state with this function
  handleDashboard(value) {
    const container = this.state.showContainer === 'dashBoard' ? 'proposalDetail' : 'dashBoard';
    this.setState({
      showContainer: container,
      proposalID: value
    });
  }

  render() {
    const { classes, proposals, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid className={style}>
        <h1 className="dashBoardheading">PROPOSAL DASHBOARD</h1>
        {this.state.showContainer === 'proposalDetail' && (
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
                currentUser={this.props.app.currentUser}
              />
            ),
            proposalDetail: (
              <ProposalDetail
                deviceType={this.props.deviceType}
                proposal={this.state.proposalID}
                totalNodes={this.props.totalNodes}
              />
            )
          }[this.state.showContainer]
        }
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    proposals: state.proposals,
    totalNodes: state.sysStats.value.general.registered_masternodes_verified * 0.1,
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    getProposals: () => dispatch(actions.getProposals())
  };
};
DashBoard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(stateToProps, dispatchToProps)(withStyles(dashboardStyle)(DashBoard));
