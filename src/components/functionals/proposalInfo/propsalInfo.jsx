/**
 * Inputs: title, paymentAmount, paymentType, daysRemaining, monthRemaining
 * Outputs: none
 */

import React, { Component } from 'react';

// import style
import injectSheet from 'react-jss';
import proposalInfoStyle from './propsalInfo.style';

class ProposalInfo extends Component {

  render() {
    const { classes, title, paymentAmount, paymentType, daysRemaining, monthRemaining } = this.props;
    return (
      <div className={classes.root}>
        <h1 className="proposalHeading">
          {title ? (
            title.split('\n', 1)[0]
          ) : (
            <span style={{ color: 'grey' }}>
              No title available for this proposal.
            </span>
          )}
        </h1>
        <div className="proposalDetail">
        <span>{`${paymentAmount} SYS ${paymentType} `}</span>

        {daysRemaining < 30 ? (
          <span>{`(${daysRemaining} Day${
            daysRemaining > 1 ? 's' : ''
          } Remaining)`}</span>
        ) : (
          <span>{`(${monthRemaining} Month${
            monthRemaining > 1 ? 's' : ''
          } Remaining)`}</span>
        )}
      </div>
    </div>
    )
  }
}

export default injectSheet(proposalInfoStyle)(ProposalInfo);