/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import { Grid, FormGroup, withStyles } from 'material-ui';

import { proposalPaymentStyle } from './styles';

class ProposalPayment extends Component {
  constructor(props) {
    super(props);
    var sdate = new Date(this.props.data.start_epoch * 1000);
    var startDate = sdate.toDateString();
    var edate = new Date(this.props.data.end_epoch * 1000);
    var endDate = edate.toDateString();
    this.state = {
      onTimePayment: this.props.data.payment_amount,
      compeletePayment: 'abc',
      Paymentdate: 'abc',
      startDate: startDate,
      endDate: endDate
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
            PAYMENTS
      </Typography>


        </Grid>
        <Grid item md={11} className="no-margin">
          <hr />
        </Grid>
        <Grid item container md={12} className="paymentsView">
          <Grid item md={3} className="OnTimePaymentView">
            <div className="heading">

              <Typography variant="subheading" gutterBottom>
                One Time Payment
          </Typography>

            </div>
            <form className="form">
              <FormGroup className="FormGroup">
                <Typography color='inherit'>
                  <input
                    name="onTimePayment"
                    id="onTimePayment"
                    className="input-field"
                    placeholder="Amount"
                    onChange={e => { }}
                    value={this.state.onTimePayment + ' SYS'}
                    disabled={true}
                  />
                </Typography>
              </FormGroup>
            </form>
          </Grid>
          <Grid item md={3} className="OnTimePaymentView">
            <div className="heading">
              <Typography variant="subheading" gutterBottom>
                Complete Payment
          </Typography>
            </div>

            <form className="form">
              <FormGroup className="FormGroup">
                <Typography color='inherit'>
                  <input
                    name="compeletePayment"
                    id="compeletePayment"
                    className="input-field"
                    placeholder="no payments occurred yet"
                    onChange={e => { }}
                    disabled={true}
                  />
                </Typography>
              </FormGroup>
            </form>
          </Grid>

          <Grid item md={3} className="OnTimePaymentView">
            <div className="heading">
              <Typography variant="subheading" gutterBottom>
                Start & End Date
          </Typography>
            </div>
            <form className="form">
              <FormGroup className="FormGroup">
                <Typography color='inherit'>
                  <input
                    ref={ref => { }}
                    name="Paymentdate"
                    id="Paymentdate"
                    className="input-field"
                    placeholder="Start Date / End Date"
                    onChange={e => { }}
                    value={this.state.startDate + ' / ' + this.state.endDate}
                    disabled={true}
                  />
                </Typography>
              </FormGroup>
            </form>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProposalPayment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(proposalPaymentStyle)(ProposalPayment);
