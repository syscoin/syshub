import React, {useEffect, useState} from "react";
import {Collapse} from 'react-collapse';

export default function ProposalCard({proposal, enabled}) {
  const [useCollapse, setUseCollapse] = useState(false);
  useEffect(() => {
    // console.log(proposal);
    return () => {
    };
  }, []);

  const comaToNum = (str) => {
    return Number(str.replace(",", ""));
  }

  function proposalDate(creationTime) {
    var unixTimestamp = creationTime;
    var milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat =
      dateObject.getDate() +
      "-" +
      (dateObject.getMonth() + 1) +
      "-" +
      dateObject.getFullYear();

    return humanDateFormat;
  }

  function proposalPassing(yesCount, noCount, enabled) {
    console.log(enabled)
    if (((yesCount - noCount) / enabled) * 100 > 10) {
      return (
        <div className="passed">
          <i className="demo-icon icon-ok"></i> Passed
        </div>
      )
    } else {
      return (
        <div className="not-passed">
          <i className="demo-icon icon-cancel-1"></i> Not passed
        </div>
      )
    }
  }

  const voteYes = () => {

  }

  const voteNo = () => {

  }

  return (
    <div className="proposal">
      <div className="vote-count">
        <span className="yes">{proposal.YesCount}</span>
        <span className="no">{proposal.NoCount}</span>
        {proposalPassing(proposal.YesCount, proposal.NoCount, comaToNum(enabled))}

      </div>
      <div className="description">
        <div className="date">{proposalDate(proposal.CreationTime)}</div>
        {proposal.name}
        <br/>
        <div className="budget">
          {`${parseFloat(proposal.payment_amount * proposal.nPayment)} SYS`} <br/>
          {`${parseFloat(proposal.payment_amount)} SYS/Month`} <br/>
          {`${proposal.nPayment} Payment(s)`}
          <Collapse isOpened={useCollapse} initialStyle={{height: 0, overflow: 'hidden'}}>
              <div className={"ReactCollapse--collapse"}>
                In progress..
              </div>
          </Collapse>
        </div>
      </div>
      <div className="actions">
        <button
          style={{border: "none", outline: "none"}}
          className="vote"
          title="Vote yes"
        >
          <i className="icon-up-open"></i>
        </button>
        <button
          style={{border: "none", outline: "none"}}
          className="vote"
          title="More info"
          onClick={() => setUseCollapse(!useCollapse)}
        >
          <i className="icon-info"></i>
        </button>
        <button
          style={{border: "none", outline: "none"}}
          className="vote"
          title="Vote no"
        >
          <i className="icon-down-open"></i>
        </button>
      </div>
    </div>
  );
}
