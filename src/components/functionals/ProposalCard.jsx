/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import antd components
import { Divider } from 'antd';
import { Grid, withStyles } from 'material-ui';
import { Progress } from 'antd';


import { proposalCardStyle } from './styles';

class ProposalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalList: [
        {
          name: "Proposal 1",
          detail: "Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.",
          upVote: 23,
          downVote: 8,
          progress: 10,
          active: true,
          id: 1
        },
        {
          name: "Proposal 2",
          detail: "Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.",
          upVote: 12,
          downVote: 1,
          progress: 20,
          active: false,
          id: 2



        },
        {
          name: "Proposal 3",
          detail: "Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.",
          upVote: 36,
          downVote: 9,
          progress: 60,
          active: false,
          id: 3



        },
        {
          name: "Proposal 4",
          detail: "Proposal Details ....Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissim justo at arcu viverra gravida.",
          upVote: 23,
          downVote: 8,
          progress: 90,
          active: false,
          id: 4



        },


      ]
    }

  }
  render() {
    const classes = this.props.classes,
      docIcon = require('../../assets/img/png_stats_propposal_votes.png'),
      voteUpIcon = require('../../assets/img/png_button_up.png'),
      voteDownIcon = require('../../assets/img/png_button_down.png'),
      smallVoteUpIcon = require('../../assets/img/png_icon_up.png'),
      smallVoteDownIcon = require('../../assets/img/png_icon_down.png');

    return (
      <Grid container className={classes.proposalRoot}>

        {
          this.state.proposalList.map((proposal, index) => {

            return (
              <Grid container md={11} className="proposalRow" key={index}>
                <Grid item md={2} className="proposalView">
                  <Progress type="circle" percent={proposal.progress} format={percent => <img src={docIcon} className="progressIcon" />} className="progress-dial" status="exception" />
                  <div className="proposalStatusNo"><span className="proposalStatusActiveNo">{proposal.progress } </span>/100</div>
                </Grid>
                <Grid item md={6} className="proposalInfoView">
                  <button className={proposal.active ? "activeVoteButton" : "voteButton"}> Vote on Proposal </button>
                  <h1 className="proposalHeading"> {proposal.name}</h1>
                  <div className="proposalDetail">{proposal.detail}</div>
                </Grid>

                {proposal.id == 1 ?
                  <Grid item md={3} className="VotesView">

                    <div className="votesIconView">

                      <img src={voteUpIcon} className="upVoteIcon" />
                      <img src={voteDownIcon} className="downVoteIcon" />
                    </div>


                    <div className="votesNoView">
                      <div className="voteNumber">{proposal.upVote}</div>
                      <div className="voteNumber">{proposal.downVote}</div>
                    </div>


                  </Grid>

                  :
                  <Grid item md={3} className="VotesView">

                    <img src={smallVoteUpIcon} className="smallUpVoteIcon" />
                    <span className="voteNumber">{proposal.upVote}</span>
                    <img src={smallVoteDownIcon} className="smallDownVoteIcon" />
                    <span className="voteNumber">{proposal.downVote}</span>
                  </Grid>

                }
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
