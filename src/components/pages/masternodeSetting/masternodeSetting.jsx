import React, { Component } from 'react';
import injectSheet from 'react-jss';

import { connect } from 'react-redux';
import Cryptr from 'cryptr';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// import Icons
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Add from '@material-ui/icons/Add';

// import style
import masterNodeSettingStyle from './masternodeSetting.style';

// import components
import { MasternodeList, MasternodeAdd, MasternodeBatchAdd } from '../../functionals';
import { fire } from '../../../API/firebase';

class MasternodeSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [],
      activeTab: 0,
    };

    this.addNode = this.addNode.bind(this);
    this.addNodes = this.addNodes.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.editNode = this.editNode.bind(this);
  }

  componentDidMount() {
    const user = fire.auth().currentUser;

    fire
      .database()
      .ref('MasterNodes/' + user.uid)
      .on('value', snapshot => {
        let list = [];
        snapshot.forEach(snap => {
          list.push(snap.val());
        });
        this.setState({
          nodes: list
        });
      });
  }

  addNodes(masternodeArray) {
    masternodeArray.map(mn => this.addNode(mn));    
  }

  addNode(masternode) {
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to add a Master Node');
      return;
    }
    const cryptr = new Cryptr(user.uid);

    masternode.key = this.state.nodes.length + 1;
    masternode.mnPrivateKey = cryptr.encrypt(masternode.mnPrivateKey);
    masternode.txid = cryptr.encrypt(masternode.txid);
    this.setState({
      nodes: [masternode, ...this.state.nodes]
    });

    const newKey = fire
      .database()
      .ref()
      .push().key;

    masternode.keyId = newKey;

    fire
      .database()
      .ref('MasterNodes/' + user.uid)
      .child(masternode.keyId)
      .set(masternode);
  }

  deleteNode(node) {
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to delete a Master Node');
      return;
    }

    fire
      .database()
      .ref('MasterNodes/' + user.uid)
      .child(node.keyId)
      .remove();
  }

  editNode(node) {
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to edit a Master Node');
      return;
    }

    const cryptr = new Cryptr(user.uid);

    node.mnPrivateKey = cryptr.encrypt(node.mnPrivateKey);
    node.txid = cryptr.encrypt(node.txid);

    fire
      .database()
      .ref('MasterNodes/' + user.uid)
      .child(node.keyId)
      .update(node);
  }

  handleOnTabClick = (event, activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { classes, deviceType } = this.props;
    const {activeTab} = this.state;
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
          { activeTab === 0 && <MasternodeAdd deviceType={this.props.deviceType} addNode={this.addNode} /> }
          { activeTab === 1 && <MasternodeBatchAdd deviceType={this.props.deviceType} addNodes={this.addNodes} /> }
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

export default connect(stateToProps, dispatchToProps)(injectSheet(masterNodeSettingStyle)(MasternodeSetting));
