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
    var sdate = new Date(
      (this.props.data.start_epoch || this.props.data.first_epoch) * 1000
    );
    var startDate = sdate.toDateString();
    var edate = new Date(this.props.data.end_epoch * 1000);
    var endDate = edate.toDateString();
    this.state = {
      owner: this.props.data.username,
      oneTimePayment: this.props.data.payment_amount,
      payment_type: '',
      compeletePayment: '',
      Paymentdate: '',
      startDate: startDate,
      endDate: endDate
    };
  }

  componentWillMount() {
    const {
      nPayment,
      end_epoch,
      payment_amount,
      collateralHash,
      username
    } = this.props.data;
    //const millsMonth = 30 * 24 * 60 * 60 * 1000;

    console.log('ACZ owner data -->', this.props.data);
    const today = new Date();

    //const startDate = new Date(first_epoch * 1000);
    const endDate = new Date(end_epoch * 1000);
    //const nPayment = Math.round((endDate - startDate) / millsMonth) + 1;

    if (endDate > today) {
      let timeDiff = endDate.getTime() - today.getTime();
      let days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      const month_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 30);
      const payment_type = 'User name';
      this.setState({
        collateralHash,
        days_remaining,
        month_remaining,
        payment_amount,
        payment_type
      });
    }
    //this.setState({ payment_amount, payment_type: 'one-time payment' });
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
                    placeholder="proposal owner"
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
            <form className="form">
              <FormGroup className="FormGroup">
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
