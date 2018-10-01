import React, { Component } from 'react';
import injectSheet from 'react-jss';

import { connect } from 'react-redux';
import Cryptr from 'cryptr';

// import style
import { masterNodeStyle } from './styles';

// import components
import { MasternodeList, MasternodeAdd } from '../functionals';
import { fire } from '../../API/firebase';

class MasterNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: []
    };

    this.addNode = this.addNode.bind(this);
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

  addNode(masternode) {
    const user = this.props.app.currentUser;
    if (!user) {
      alert('Must be logged in to add a Master Node');
      return;
    }
    const cryptr = new Cryptr(user.uid);

    masternode.key = this.state.nodes.length + 1;
    masternode.mnPrivateKey = cryptr.encrypt(masternode.mnPrivateKey);
    masternode.vin = cryptr.encrypt(masternode.vin);
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
    node.vin = cryptr.encrypt(node.vin);

    fire
      .database()
      .ref('MasterNodes/' + user.uid)
      .child(node.keyId)
      .update(node);
  }

  render() {
    const { classes, deviceType } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    return (
      <div className={style}>
        <h1 className="title">Masternode Settings</h1>
        <div className="masternode-div">
          <MasternodeAdd deviceType={this.props.deviceType} addNode={this.addNode} />
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

export default connect(stateToProps, dispatchToProps)(injectSheet(masterNodeStyle)(MasterNode));
