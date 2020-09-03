import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { compose } from 'recompose';

// import providers HOC's
import { withFirebase } from '../../../providers/firebase';

import swal from 'sweetalert';

// import Material-ui Items
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Add from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// import style
import masterNodeSettingStyle from './masternodeSetting.style';

// import custom components
import {
  MasternodeList,
  MasternodeAdd,
  MasternodeBatchAdd
} from '../../functionals';

class MasternodeSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
      activeTab: 0
    };

    this.addMasternodes = this.addMasternodes.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.editNode = this.editNode.bind(this);
  }

  // add Firebase as global var in component
  firebase = this.props.firebase;

  componentDidMount() {
    this.props.cancelXHR();
    this.refreshMasternodeList();
  }

  async refreshMasternodeList() {
    const user = this.props.app.currentUser;
    const mnList = await this.firebase.getMasternodeListByUser(user.uid);
    this.setState({ nodes: mnList, user });
  }

  prepareMasternodeError(pkArray) {
    const arrayJoined = pkArray.join();
    return arrayJoined.replace(/,/g, ',\n');
  }

  async addMasternodes(masternodeArray) {
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to add a Master Node');
      return;
    }
    const { error, success } = await this.firebase.addMasternodes(
      masternodeArray,
      user.uid
    );
    if (!success) {
      swal({
        className: 'sweetalertModal',
        title: 'Skipping',
        text: `The Masternodes with the Private-key:\n\n ${this.prepareMasternodeError(
          error
        )}\n\n already exists`,
        icon: 'error'
      });
    }
    else {
      swal({
        title: 'Success',
        text: `Masternode added successfully`,
        icon: 'success'
      });
      
    }
    this.refreshMasternodeList();
  }

  async deleteNode(masternode) {
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to delete a Master Node');
      return;
    }
    await this.firebase.deleteMasternode(masternode, user.uid);
    this.refreshMasternodeList();
  }

  async editNode(masternode) {
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to edit a Master Node');
      return;
    }
    await this.firebase.updateMasternode(masternode, user.uid);
    this.refreshMasternodeList();
  }

  handleOnTabClick = (event, activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { classes, deviceType } = this.props;
    const { activeTab } = this.state;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        <h1 className="title">Masternode Settings</h1>
        <div className="masternode-div">
          <div className="heading">
            <h2 className="add-title">Add New Masternode</h2>
          </div>
          <Tabs
            value={activeTab}
            onChange={this.handleOnTabClick}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab icon={<Add />} label="ADD" />
            <Tab icon={<PlaylistAdd />} label="MULTIPLE ADD" />
          </Tabs>
          {activeTab === 0 && (
            <MasternodeAdd
              deviceType={this.props.deviceType}
              addNode={this.addMasternodes}
            />
          )}
          {activeTab === 1 && (
            <MasternodeBatchAdd
              deviceType={this.props.deviceType}
              addNodes={this.addMasternodes}
            />
          )}
          <MasternodeList
            deviceType={this.props.deviceType}
            nodes={this.state.nodes}
            deleteNode={this.deleteNode}
            editNode={this.editNode}
          />
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

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(masterNodeSettingStyle)
)(MasternodeSetting);
