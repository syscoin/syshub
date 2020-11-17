import React, {useEffect, useState} from "react";
import {Collapse} from 'react-collapse';

import {useUser} from '../../context/user-context';
import ProposalCardInfo from "./ProposalCardInfo";
import CustomModal from "../global/CustomModal";
import MnList from "./MnList";

export default function ProposalCard({proposal, enabled}) {
  const {user} = useUser();
  const [useCollapse, setUseCollapse] = useState(false);
  const [openMnList, setOpenMnList] = useState(false);

  const [days_remaining, setDays_remaining] = useState(0);
  const [month_remaining, setMonth_remaining] = useState(0);
  const [payment_type, setPayment_type] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [vote, setVote] = useState('');

  useEffect(() => {
    let {end_epoch, nPayment} = proposal
    const today = new Date();
    setEndDate(new Date(end_epoch * 1000))
    if (endDate > today) {
      const timeDiff = endDate.getTime() - today.getTime();
      const days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
      const month_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 30);
      const payment_type = nPayment > 1 ? 'per month' : 'one-time payment';
      setDays_remaining(days_remaining)
      setMonth_remaining(month_remaining)
      setPayment_type(payment_type)
      setEndDate(endDate.getDate() + '/' + (parseInt(endDate.getMonth(), 10) + 1) + '/' + endDate.getFullYear())
    }

  }, [proposal, days_remaining, month_remaining, payment_type, endDate]);


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

  function openMnVote(vote) {
    setVote(vote);
    setOpenMnList(true);
  }

  function afterVote() {
    //recargar proposals y cerrar modal
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

        <span title="more info" style={{cursor: 'pointer'}} onClick={() => setUseCollapse(!useCollapse)}>
          {proposal.title || proposal.name}
        </span>

        <br/>

        <div className="budget">
          {`${parseFloat(proposal.payment_amount * proposal.nPayment)} SYS`} <br/>
          {`${parseFloat(proposal.payment_amount)} SYS/Month`} <br/>
          {`${proposal.nPayment} Payment(s)`}


        </div>
        <Collapse
          isOpened={useCollapse}
          initialStyle={{height: 0, overflow: 'hidden'}}
        >
          <div className={"ReactCollapse--collapse"}>
            <ProposalCardInfo proposal={proposal} days_remaining={days_remaining} month_remaining={month_remaining} payment_type={payment_type}/>
          </div>
        </Collapse>
      </div>
      {
        user && (
          <div className="actions">
            <button
              style={{border: "none", outline: "none"}}
              className="vote"
              title="Vote yes"
              onClick={() => openMnVote(1)}
            >
              <i className="icon-up-open"></i>
            </button>
            <button
              style={{border: "none", outline: "none"}}
              className="vote"
              title="Abstain"
              onClick={() => openMnVote(3)}
            >
              <i className="icon-minus-outline"></i>
            </button>
            <button
              style={{border: "none", outline: "none"}}
              className="vote"
              title="Vote no"
              onClick={() => openMnVote(2)}
            >
              <i className="icon-down-open"></i>
            </button>
          </div>
        )
      }
      <CustomModal
        open={openMnList}
        onClose={() => setOpenMnList(false)}>
        <MnList proposal={proposal} vote={vote} onAfterVote={afterVote}/>
      </CustomModal>
    </div>
  );
}
