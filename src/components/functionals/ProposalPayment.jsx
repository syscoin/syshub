/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, FormGroup, Input, withStyles } from 'material-ui';


import { proposalPaymentStyle } from './styles';

class ProposalPayment extends Component {
  constructor(props) {
    super(props);


  }
  render() {
    const classes = this.props.classes;

    return (
      <Grid lg={11} className={classes.proposalPaymentRoot}>


        <Grid item >
          <h1>Payments </h1>
        </Grid>
        <Grid item >
          <hr />
        </Grid>

        <Grid container md={12} className="paymentsView" >
          <Grid item md={4}  className="OnTimePaymentView">
            On Time Payment
              <form className="form">
                <FormGroup className="FormGroup">
                  <input
                    ref={(ref) => { }}
                    name="onTimePayment"
                    id="onTimePayment"
                    className="input-field"
                    placeholder="21 SYS (29209 USD)"
                    onChange={e => { }}
                  />
                </FormGroup>
              </form>

          </Grid>
          <Grid item md={4}  >
            Complete Payment
            <form className="form">
                <FormGroup className="FormGroup">
                  <input
                    ref={(ref) => { }}
                    name="onTimePayment"
                    id="onTimePayment"
                    className="input-field"
                    placeholder="no payments occurred yet"
                    onChange={e => { }}
                  />
                </FormGroup>
              </form>
        </Grid>

          <Grid item md={4}  >
            Start & End Date
            <form className="form">
                <FormGroup className="FormGroup">
                  <input
                    ref={(ref) => { }}
                    name="onTimePayment"
                    id="onTimePayment"
                    className="input-field"
                    placeholder="21 SYS (29209 USD)"
                    onChange={e => { }}
                  />
                </FormGroup>
              </form>
        </Grid>



        </Grid>

      </Grid>

    )


  }
}

ProposalPayment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(proposalPaymentStyle)(ProposalPayment);
