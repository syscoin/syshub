import React from 'react';

export default function ProposalCardInfo({proposal, days_remaining, month_remaining, payment_type}) {

  function proposalUrl(url) {
    if (url !== "" && url !== 'emptyField') {
      return <a href={url} target='_blank' rel='noopener noreferrer'>View proposal on syscoin.org</a>;
    } else {
      return <p>This proposal doesn't have an url</p>;
    }
  }

  return (
    <div className="budget">
      {
        (proposal.description !== '') && <>
          <span>Description:</span>
          <div
            className="description-proposal"
            dangerouslySetInnerHTML={{
              __html: proposal.description
            }}
          ></div>
        </>
      }
      <p style={{lineBreak: "anywhere", lineHeight: "initial"}}>
        Collateral hash: <a
        href={`https://chainz.cryptoid.info/sys/tx.dws?${proposal.ColHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >{proposal.ColHash}</a>
      </p>
      <p>
        {days_remaining < 30 ? (
          <span>{`(${days_remaining} Day${
            days_remaining > 1 ? 's' : ''
          } Remaining)`}</span>
        ) : (
          <span>{`(${month_remaining} Month${
            month_remaining > 1 ? 's' : ''
          } Remaining)`}</span>
        )}
      </p>
      <span style={{lineHeight: "1.5"}}>
        Voting string: 
      </span>
      <div className="input-form">
        <div className="form-group">

          <textarea
            type="text"
            className="styled"
            style={{resize: 'none'}}
            value={`gobject vote-many ${proposal.Hash} funding yes`}
            disabled={true}
          />
        </div>
      </div>

      <>{proposalUrl(proposal.url)}</>
    </div>
  )
}
