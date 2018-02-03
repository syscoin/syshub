import React, { Component } from 'react';
import { Button, Grid, FormGroup, Input, withStyles } from 'material-ui';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import style
import { masterNodeStyle } from './styles';

// import components
import { MasternodeList, MasternodeAdd } from '../functionals';
class MasterNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: [
        {
          key: 0,
          name: 'Mnode1',
          address:
            '0d8394401c13236e95e0b6e0ec93ce14133caae74df7e0db6f0424d648b07d02-0'
        },
        {
          key: 1,
          name: 'Mnode2',
          address:
            'd5cc703fd3548d886445f9aba9f509a85ce0b918391052459aee292e98b8bb01-1'
        },
        {
          key: 2,
          name: 'Mnode3',
          address:
            '4846fd20a1e97c44beaa4ab427ebec9d60741954006c35f8b9a959100755fe7f-0'
        },
        {
          key: 3,
          name: 'Mnode4',
          address:
            'b794f039fd5e3f361f474580833412bc41a43bc1886ed060c077c0a2433cf0c-0'
        }
      ]
    };

    this.addNode = this.addNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.editNode = this.editNode.bind(this);
  }

  addNode(masternode) {
    masternode.key = this.state.nodes.length + 1;
    this.setState({
      nodes: [masternode, ...this.state.nodes]
    });
  }

  deleteNode(node) {
    let nodes = this.state.nodes.filter(obj => obj.key != node.key);
    this.setState({
      nodes: [...nodes]
    });
  }

  editNode(node) {
    let nodes = this.state.nodes.map((obj, index) => {
      if (obj.key == node.key) {
        return node;
      }
      return obj;
    });
    this.setState({
      nodes: [...nodes]
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1 className="title">Masternode Settings</h1>
        <div className="masternode-div">
          <MasternodeAdd
            deviceType={this.props.deviceType}
            addNode={this.addNode}
          />
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
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(masterNodeStyle)(MasterNode)
);
