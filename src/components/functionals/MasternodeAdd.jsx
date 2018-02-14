import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Button, Grid, FormGroup, withStyles } from 'material-ui';

// import style
import { masternodeAddStyle } from './styles';

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
    if (this.state.newNode.name && this.state.newNode.address) {
      console.log(
        'Master Node name ' +
          this.state.newNode.name +
          ' Master Node Address ' +
          this.state.newNode.address
      );
      this.props.addNode(this.state.newNode);
      this.setState({ newNode: { name: '', address: '' } });
    }
  }

  onChange(e) {
    this.setState({
      newNode: {
        ...this.state.newNode,
        [e.target.name]: e.target.value
      }
    });
  }

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div className={style}>
        <div className="heading">
          <h2 className="add-title">Add New Masternode</h2>
        </div>
        <Grid item md={12} className="form__container">
          <form
            onSubmit={event => this.addNode(event)}
            ref={form => {
              this.addNodeForm = form;
            }}
            className="wrapper"
          >
            <Grid
              item
              lg={{ size: 8, offset: 2 }}
              md={{ size: 10, offset: 1 }}
              justify="center"
            >
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
                  placeholder="e.g Mnode1"
                  value={this.state.newNode.name}
                  onChange={this.onChange}
                />
              </FormGroup>

              {/* For Password */}
              <FormGroup className="form-group">
                <span htmlFor="password" className="label">
                  {`Masternode 1000 SYS coin Address: `}
                </span>
                <input
                  ref={address => (this.nodeAddress = address)}
                  id="address"
                  name="address"
                  className="input-field"
                  placeholder="enter a valid address"
                  value={this.state.newNode.address}
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
  withStyles(masternodeAddStyle)(MasterNodeAdd)
);
