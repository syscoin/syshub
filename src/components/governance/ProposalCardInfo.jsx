import React from "react";
import DOMPurify from "dompurify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import swal from "sweetalert2";
import {unescape} from "../proposal/DescriptionProposal";


/**
 * Component to show certain info of the proposal inside proposalCard
 * @component
 * @subcategory Governance
 * @param {Object} proposal the single proposal passed from proposalCard
 * @param {number} days_remaining the number of enabled masternodes
 * @param {number} month_remaining the info of the user currently logged in
 * @example
 * const proposal = {}
 * const days_remaining = 1
 * const month_remaining = 1
 * return (
 *  <ProposalCardInfo proposal={proposal} days_remaining={days_remaining} month_remaining={month_remaining} />
 * )
 */
function ProposalCardInfo({
  proposal,
  days_remaining,
  month_remaining,
  payment_type,
}) {
  const isMainnet = process.env.REACT_APP_CHAIN_NETWORK === "main";
  const blockbookBase = isMainnet
    ? "https://blockbook.syscoin.org"
    : "https://blockbook-dev.syscoin.org";

  /**
   * Function that returns an html with the link or not of the proposal
   * @function
   * @param {string} url string of the proposal url
   */
  function proposalUrl(url) {
    if (url !== "" && url !== "emptyField") {
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="proposal-link-button"
        >
          📄 View Full Proposal on Syscoin.org
        </a>
      );
    } else {
      return <p>This proposal doesn't have an url</p>;
    }
  }

  /**
   * function after copy the hash of the proposal
   * @function
   */
  const onCopy = () => {
    swal.fire({
      icon: "success",
      title: "Copied",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="budget">
      {proposal.description !== "" && (
        <>
          <span>Description:</span>
          <div
    className="description-proposal"
    dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(unescape(proposal.description ?? '')),
    }}
    />
        </>
      )}
      
      {/* Prominent View Proposal Button */}
      <div className="proposal-link-section">
        {proposalUrl(proposal.url)}
      </div>
      
      <p>
        {days_remaining < 30 ? (
          <span>{`(${days_remaining} Day${
            days_remaining > 1 ? "s" : ""
          } Remaining)`}</span>
        ) : (
          <span>{`(${month_remaining} Month${
            month_remaining > 1 ? "s" : ""
          } Remaining)`}</span>
        )}
      </p>
      <span style={{ lineHeight: "1.5" }}>Voting Commands:</span>
      
      {/* Yes Vote Command */}
      <div className="voting-command-section">
        <label className="voting-command-label voting-command-label--yes">
          👍 Vote YES
        </label>
        <div className="cli-command-container">
          <textarea
            className="styled"
            style={{ resize: "none", minHeight: "60px" }}
            value={`gobject_vote_many ${proposal.Key} funding yes`}
            disabled={true}
            rows="3"
          />
          <CopyToClipboard
            text={`gobject_vote_many ${proposal.Key} funding yes`}
            onCopy={onCopy}
          >
            <button className="copy-icon" type="button" title="Copy YES command">📋</button>
          </CopyToClipboard>
        </div>
      </div>

      {/* No Vote Command */}
      <div className="voting-command-section">
        <label className="voting-command-label voting-command-label--no">
          👎 Vote NO
        </label>
        <div className="cli-command-container">
          <textarea
            className="styled"
            style={{ resize: "none", minHeight: "60px" }}
            value={`gobject_vote_many ${proposal.Key} funding no`}
            disabled={true}
            rows="3"
          />
          <CopyToClipboard
            text={`gobject_vote_many ${proposal.Key} funding no`}
            onCopy={onCopy}
          >
            <button className="copy-icon" type="button" title="Copy NO command">📋</button>
          </CopyToClipboard>
        </div>
      </div>

      {/* Abstain Vote Command */}
      <div className="voting-command-section">
        <label className="voting-command-label voting-command-label--abstain">
          ➖ ABSTAIN
        </label>
        <div className="cli-command-container">
          <textarea
            className="styled"
            style={{ resize: "none", minHeight: "60px" }}
            value={`gobject_vote_many ${proposal.Key} funding abstain`}
            disabled={true}
            rows="3"
          />
          <CopyToClipboard
            text={`gobject_vote_many ${proposal.Key} funding abstain`}
            onCopy={onCopy}
          >
            <button className="copy-icon" type="button" title="Copy ABSTAIN command">📋</button>
          </CopyToClipboard>
        </div>
      </div>

      {/* Hash Information - Less Prominent */}
      <div className="hash-info-section">
        <p style={{ lineBreak: "anywhere", lineHeight: "initial" }}>
          Hash: <CopyToClipboard
            text={proposal.Hash}
            onCopy={onCopy}
          ><span style={{cursor:'pointer'}}>{proposal.Hash}</span></CopyToClipboard>
        </p>
        <p style={{ lineBreak: "anywhere", lineHeight: "initial" }}>
          Collateral hash:{" "}
          <a
            href={`${blockbookBase}/tx/${proposal.ColHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {proposal.ColHash}
          </a>
        </p>
      </div>
    </div>
  );
}
export default ProposalCardInfo;
