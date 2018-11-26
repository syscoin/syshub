import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

// import style
import masterNodeInfoStyle from './masternodeInfo.style';

class MasternodeInfo extends Component {

componentDidMount() { }

   render() {
    const { classes, deviceType } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        <h1 className="title">Masternode Info</h1>
        <div className="masternode-div">
          <div className="heading">
            <h2 className="add-title">Add New Masternode</h2>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(injectSheet(masterNodeInfoStyle)(MasternodeInfo));
