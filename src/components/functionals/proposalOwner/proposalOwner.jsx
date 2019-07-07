/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { Grid, FormGroup } from '@material-ui/core';

import injectSheet from 'react-jss';
import proposalPaymentStyle from './proposalOwner.style';

class ProposalOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: this.props.data.username,
      collateralHash: this.props.data.collateralHash
    };
  }

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid item md={12} className={style}>
        <Grid item className="no-margin">
          <Typography variant="headline" gutterBottom>
            OWNER
          </Typography>
        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid item container md={12} className="ownerView">
          <Grid item md={3} className="OnTimeOwnerView">
            <div className="heading">
              <Typography variant="subheading" gutterBottom>
                User name
              </Typography>
            </div>
            <form className="form">
              <FormGroup className="FormGroup">
                <Typography color="inherit">
                  <input
                    name="onTimePayment"
                    id="onTimePayment"
                    className="input-field"
                    placeholder="no user name defined"
                    onChange={e => {}}
                    value={this.state.owner}
                    disabled={true}
                  />
                </Typography>
              </FormGroup>
            </form>
          </Grid>
          <Grid item md={9} className="OnTimeOwnerView">
            <div className="heading">
              <Typography variant="subheading" gutterBottom>
                Collateral hash
              </Typography>
            </div>
            <form className="form ">
              <FormGroup className="FormGroup withLink">
                <Typography color="inherit">
                  <input
                    ref={ref => {}}
                    name="collateralHash"
                    id="collateralHash"
                    className="input-field"
                    placeholder="Collateral Hash"
                    onChange={e => {}}
                    value={this.state.collateralHash}
                    disabled={true}
                  />
                </Typography>
                <div className="collateralHashInfo">
                  <a
                    href={`https://chainz.cryptoid.info/sys/tx.dws?${
                      this.state.collateralHash
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-external-link-alt" />
                  </a>
                </div>
              </FormGroup>
            </form>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProposalOwner.propTypes = {
  classes: PropTypes.object.isRequired
};
export default injectSheet(proposalPaymentStyle)(ProposalOwner);
