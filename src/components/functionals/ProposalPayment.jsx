/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

import { Grid, FormGroup, withStyles } from 'material-ui';

import { proposalPaymentStyle } from './styles';

class ProposalPayment extends Component {
  constructor(props) {
    super(props);
    var sdate = new Date((this.props.data.first_epoch || this.props.data.start_epoch) * 1000);
    var startDate = sdate.toDateString();
    var edate = new Date(this.props.data.end_epoch * 1000);
    var endDate = edate.toDateString();
    this.state = {
      oneTimePayment: this.props.data.payment_amount,
      payment_type: '',
      compeletePayment: '',
      Paymentdate: '',
      startDate: startDate,
      endDate: endDate
    };
  }

  componentWillMount() {
    const { nPayment, end_epoch, payment_amount } = this.props.data;
    //const millsMonth = 30 * 24 * 60 * 60 * 1000;
    const today = new Date();

    //const startDate = new Date(first_epoch * 1000);
    const endDate = new Date(end_epoch * 1000);
    //const nPayment = Math.round((endDate - startDate) / millsMonth) + 1;

    if (endDate > today) {
      let timeDiff = endDate.getTime() - today.getTime();
      let days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      const month_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 30);
      const payment_type = nPayment > 1 ? `${nPayment} totalling in ${payment_amount * nPayment} SYS` : 'one-time payment';
      this.setState({
        days_remaining,
        month_remaining,
        payment_amount,
        payment_type,

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
                {this.state.payment_type}
              </Typography>
            </div>
            <form className="form">
              <FormGroup className="FormGroup">
                <Typography color="inherit">
                  <input
                    name="onTimePayment"
                    id="onTimePayment"
                    className="input-field"
                    placeholder="Amount"
                    onChange={e => { }}
                    value={this.state.oneTimePayment + ' SYS'}
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
                <Typography color="inherit">
                  <input
                    name="compeletePayment"
                    id="compeletePayment"
                    className="input-field"
                    value="no payments occurred yet"
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
                <Typography color="inherit">
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
