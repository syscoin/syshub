import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import {Collapse} from 'react-collapse';
import swal from "sweetalert2";

import {useUser} from '../../context/user-context';
import ProposalCardInfo from "./ProposalCardInfo";
import CustomModal from "../global/CustomModal";
import MnList from "./MnList";
import { string } from "yup";

export default function ProposalCard({proposal, enabled, userInfo}) {
  const {user} = useUser();
  const {t} = useTranslation();
  const [useCollapse, setUseCollapse] = useState(false);
  const [openMnList, setOpenMnList] = useState(false);
  const [days_remaining, setDays_remaining] = useState(0);
  const [month_remaining, setMonth_remaining] = useState(0);
  const [payment_type, setPayment_type] = useState('');
  const [vote, setVote] = useState('');


  useEffect(() => {
    let {end_epoch, nPayment} = proposal
    const today = new Date();

    const calculateDaysRemaining = () => {
      let endDate = new Date(end_epoch * 1000)
      if (endDate > today) {
        const timeDiff = endDate.getTime() - today.getTime();
        const days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
        const month_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 30);
        const payment_type = nPayment > 1 ? 'per month' : 'one-time payment';
        setDays_remaining(days_remaining)
        setMonth_remaining(month_remaining)
        setPayment_type(payment_type)
        endDate = endDate.getDate() + '/' + (parseInt(endDate.getMonth(), 10) + 1) + '/' + endDate.getFullYear()
      }
    }

    calculateDaysRemaining()

    return () => {
      calculateDaysRemaining()
    };
  }, [proposal]);

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

  function proposalPassing(yesCount, noCount, enabled, absoluteYesCount) {

    if (((yesCount - noCount) / enabled) * 100 > 10) {
      return (
        <div className="passed" title={t('govlist.table.green_text')}>
          <i className="demo-icon icon-ok"></i> Passed
        </div>
      )
    } else {
      let need = parseInt((enabled / 10) - absoluteYesCount);
      let originalText = t('govlist.table.red_text');
      let newText = originalText.replace("[API]", need);
      return (
        <div className="not-passed" title={newText}>
          <i className="demo-icon icon-cancel-1"></i> Not passed
        </div>
      )
    }
  }

  function openMnVote(vote) {
    if (userInfo?.emailVerified) {
      setVote(vote);
      setOpenMnList(true);
    }
    else {
      swal.fire({
        icon: 'info',
        title: 'Verify your email',
        text: 'You cannot vote if you haven´t verified your email address'
      });
      
    }
  }

  function afterVote() {
    //recargar proposals y cerrar modal
  }


  return (
    <div className="proposal">
      <div className="vote-count">
        <span className="yes">{proposal.YesCount}</span>
        <span className="no">{proposal.NoCount}</span>
        {proposalPassing(proposal.YesCount, proposal.NoCount, comaToNum(enabled), proposal.AbsoluteYesCount)}

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
              disabled={userInfo ? false : true}
              onClick={() => openMnVote(1)}
            >
              <i className="icon-up-open"></i>
            </button>
            <button
              style={{border: "none", outline: "none"}}
              className="vote"
              title="Abstain"
              disabled={userInfo ? false : true}
              onClick={() => openMnVote(3)}
            >
              <i className="icon-minus-outline"></i>
            </button>
            <button
              style={{border: "none", outline: "none"}}
              className="vote"
              title="Vote no"
              disabled={userInfo ? false : true}
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
