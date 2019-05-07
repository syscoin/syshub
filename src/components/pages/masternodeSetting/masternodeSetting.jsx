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

    this.addNode = this.addNode.bind(this);
    this.addNodes = this.addNodes.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.editNode = this.editNode.bind(this);
  }

  componentDidMount() {
    this.getMasternodeList();
  }

  async getMasternodeList() {
    const { firebase } = this.props;
    const user = this.props.app.currentUser;
    const mnList = await firebase.getMasternodeList(user.uid);
    this.setState({ nodes: mnList, user });
  }

  prepareMasternodeError(pkArray) {
    const arrayJoined = pkArray.join();
    return arrayJoined.replace(/,/g, ',\n');
  }

  addNodes(masternodeArray) {
    const { firebase } = this.props;
    const user = this.props.app.currentUser;
    const addMnError = [];
    masternodeArray.forEach(async masternode => {
      const mansternodeExists = await firebase.checkMasternodeExists(
        masternode.mnPrivateKey,
        user.uid
      );
      if (!mansternodeExists) {
        this.addMasternode(masternode);
      } else {
        addMnError.push(masternode.mnPrivateKey);
      }

      if (addMnError.length > 0) {
        swal({
          className: 'sweetalertModal',
          title: 'Skipping',
          text: `The Masternodes with the Private-key:\n\n ${this.prepareMasternodeError(
            addMnError
          )}\n\n already exists`,
          icon: 'error'
        });
      }
    });
  }

  async addNode(masternode) {
    const { firebase } = this.props;
    const user = this.props.app.currentUser;
    const mansternodeExists = await firebase.checkMasternodeExists(
      masternode.mnPrivateKey,
      user.uid
    );
    if (!mansternodeExists) {
      this.addMasternode(masternode);
    } else {
      swal({
        className: 'sweetalertModal',
        title: 'Skipping',
        text: `The Masternode with the Private-key:\n\n ${
          masternode.mnPrivateKey
        }\n\n already exists`,
        icon: 'error'
      });
    }
  }

  async addMasternode(masternode) {
    const { firebase } = this.props;
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to add a Master Node');
      return;
    }
    await firebase.addMasternode(masternode, user.uid);
    this.getMasternodeList();
  }

  async deleteNode(masternode) {
    const { firebase } = this.props;
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to delete a Master Node');
      return;
    }
    await firebase.deleteMasternode(masternode, user.uid);
    this.getMasternodeList();
  }

  async editNode(masternode) {
    const { firebase } = this.props;
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to edit a Master Node');
      return;
    }
    await firebase.updateMasternode(masternode, user.uid);
    this.getMasternodeList();
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
              addNode={this.addNode}
            />
          )}
          {activeTab === 1 && (
            <MasternodeBatchAdd
              deviceType={this.props.deviceType}
              addNodes={this.addNodes}
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
