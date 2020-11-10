import React, {useEffect, useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import swal from 'sweetalert2';


export default function ProposalCardInfo({proposal, days_remaining, month_remaining, payment_type}) {


  useEffect(() => {

  }, [])

  function proposalUrl(url) {
    if (url !== "" && url !== 'emptyField') {
      return url;
    } else {
      return "/404";
    }
  }

  return (
    <div className="budget">
      <p style={{lineBreak: "anywhere", lineHeight: "initial"}}>
        Collateral hash: <a
        href={`https://chainz.cryptoid.info/sys/tx.dws?${proposal.ColHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {proposal.ColHash}
      </a>
      </p>
      {days_remaining < 30 ? (
        <span>{`(${days_remaining} Day${
          days_remaining > 1 ? 's' : ''
        } Remaining)`}</span>
      ) : (
        <span>{`(${month_remaining} Month${
          month_remaining > 1 ? 's' : ''
        } Remaining)`}</span>
      )}
      <p style={{lineBreak: "anywhere", lineHeight: "initial"}}>
        Voting string: {`gobject vote-many ${proposal.Hash} funding yes`}
      </p>

      <a href={proposalUrl(proposal.url)} target='_blank' rel='noopener noreferrer'>View proposal on syscoin.org</a>
    </div>
  )
}
