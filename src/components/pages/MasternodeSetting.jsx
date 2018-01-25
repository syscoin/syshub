import React, { Component } from 'react';
import { Button, Grid, FormGroup, Input, withStyles } from 'material-ui';



import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import style
import { masterNodeStyle } from "./styles";


// import components
import { MasternodeList, MasternodeAdd } from '../functionals';
class MasterNode extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nodes: [{
        key: 0,
        name: 'Mnode1',
        address: '12.12.322.11.12123',
      }, {
        key: 1,
        name: 'Mnode2',
        address: '11.21.112.22.12345',
      }, {
        key: 2,
        name: 'Mnode3',
        address: '13.21.332.52.55642',
      }, {
        key: 3,
        name: 'Mnode4',
        address: '22.44.132.12.00987',
      }]
    }

    this.addNode = this.addNode.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.editNode = this.editNode.bind(this);
  }


  addNode(masternode) {
    masternode.key = this.state.nodes.length + 1;
    this.setState({
      nodes: [...this.state.nodes, masternode]
    })
  }


  deleteNode(node) {
    let nodes = this.state.nodes.filter(obj => obj.key != node.key);
    this.setState({
      nodes: [...nodes]
    })
  }

  editNode(node) {
    let nodes = this.state.nodes.map((obj, index) => {
      if (obj.key == node.key) {
        return node
      }
      return obj;
    });
    this.setState({
      nodes: [...nodes]
    })

  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <h1 className="title">
          Masternode Settings
        </h1>
        <div className="masternode-div">
          <MasternodeAdd addNode={this.addNode} />
          <MasternodeList nodes={this.state.nodes} deleteNode={this.deleteNode} editNode={this.editNode} />
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

export default connect(stateToProps, dispatchToProps)(withStyles(masterNodeStyle)(MasterNode));
