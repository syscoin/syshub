import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button, Grid, FormGroup } from '@material-ui/core';
import swal from 'sweetalert';

// import style
import injectSheet from 'react-jss';
import masternodeAddStyle from './masternodeAdd.style';

class MasterNodeAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newNode: {}
    };

    this.addNode = this.addNode.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  addNode(event) {
    event.preventDefault();
    if (RegExp(/-0|-1/).test(this.state.newNode.txid) !== true) {
      swal({
        title: 'Oops...',
        text: 'Please make sure to add "-0" or "-1" to the end of your txid.',
        icon: 'error'
      });
      return;
    }
    if (this.state.newNode.name && this.state.newNode.mnPrivateKey) {
      this.props.addNode(this.state.newNode);
      this.setState({ newNode: { name: '', mnPrivateKey: '', txid: '' } });
    }
  }

  onChange(e) {
    this.setState({
      newNode: {
        ...this.state.newNode,
        [e.target.name]: e.target.value.replace(/\s/g, '').trim()
      }
    });
  }

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        <Grid item md={12} className="form__container">
          <form
            onSubmit={event => this.addNode(event)}
            ref={form => {
              this.addNodeForm = form;
            }}
            className="wrapper"
          >
            <Grid item>
              {/* For User Name */}
              <FormGroup className="form-group">
                <span htmlFor="user-name" className="label">
                  {`Masternode Name: `}
                </span>
                <input
                  ref={name => (this.nodeName = name)}
                  id="name"
                  name="name"
                  className="input-field"
                  placeholder="masternode-name"
                  value={this.state.newNode.name}
                  onChange={this.onChange}
                />
              </FormGroup>

              {/* For Password */}
              <FormGroup className="form-group">
                <span htmlFor="password" className="label">
                  {`MN Private Key: `}
                </span>
                <input
                  ref={mnPrivateKey => (this.nodemnPrivateKey = mnPrivateKey)}
                  id="mnPrivateKey"
                  name="mnPrivateKey"
                  className="input-field"
                  placeholder="cRn.....Tfi9ZgR"
                  value={this.state.newNode.mnPrivateKey}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup className="form-group">
                <span htmlFor="password" className="label">
                  {`MN TXID: `}
                </span>
                <input
                  ref={txid => (this.nodeVin = txid)}
                  id="address"
                  name="txid"
                  className="input-field"
                  placeholder="0d8.....b07d02-0"
                  value={this.state.newNode.txid}
                  onChange={this.onChange}
                />
              </FormGroup>

              {/* Form Action Button */}
              <FormGroup className="form-group form-button-group">
                <Button type="submit" color="primary">
                  Add Masternode
                </Button>
              </FormGroup>
            </Grid>
          </form>
        </Grid>
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
  injectSheet(masternodeAddStyle)(MasterNodeAdd)
);
