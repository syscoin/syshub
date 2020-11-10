import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import swal from 'sweetalert2';


export default function ProposalCardInfo({ proposal }) {

  function proposalUrl(url) {
    if(url!=="" && url!=='emptyField') {
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
      <p>Voting Deadline: 14 days remaining (23/11/2020)</p>
      <p style={{lineBreak: "anywhere", lineHeight: "initial"}}>
        Voting string: {`gobject vote-many ${proposal.Hash} funding yes`}
      </p>

      <a href={proposalUrl(proposal.url)} target='_blank' rel='noopener noreferrer'>View proposal on syscoin.org</a>
    </div>
  )
}
