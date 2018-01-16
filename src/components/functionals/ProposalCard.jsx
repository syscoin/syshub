/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, withStyles } from 'material-ui';


import { proposalCardStyle } from './styles';

class ProposalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalList: [
        {
          name: "Proposal 1",
          detail: "Proposal Details 1",
          upVote: 23,
          downVote: 8,
        },
        {
          name: "Proposal 2",
          detail: "Proposal Details 2",
          upVote: 12,
          downVote: 1,
        },
        {
          name: "Proposal 3",
          detail: "Proposal Details 3",
          upVote: 36,
          downVote: 9,
        },
        {
          name: "Proposal 4",
          detail: "Proposal Details 4",
          upVote: 23,
          downVote: 8,
        },
      ]
    }

  }
  render() {
    const classes = this.props.classes,
      docIcon = require('../../assets/img/png_menu_create.png'),
      voteUpIcon = require('../../assets/img/png_icon_up.png'),
      voteDownIcon = require('../../assets/img/png_icon_down.png');

    return (
      <Grid container className={classes.proposalRoot}>

        {
          this.state.proposalList.map((proposal, index) => {

            return (
              <Grid container md={10} className="proposalRow" key={index}>
                <Grid item md={2} className="proposalView">
                  <img src={docIcon} />
                </Grid>
                <Grid item md={6} className="proposalInfoView">
                  <h1 className="proposalHeading"> {proposal.name}</h1>
                  <div className="proposalDetail">{proposal.detail}</div>
                </Grid>

                <Grid item md={3} className="VotesView">
                  <img src={voteUpIcon} className="upVoteIcon" />
                  <span className="voteNumber">{proposal.upVote}</span>
                  <img src={voteDownIcon} className="downVoteIcon" />
                  <span className="voteNumber">{proposal.downVote}</span>
                </Grid>
              </Grid>

            )


          })

        }
      </Grid>

    )


  }
}

ProposalCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(proposalCardStyle)(ProposalCard);
