import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Collapse } from "react-collapse";
import swal from "sweetalert2";

import { useUser } from "../../context/user-context";
import { VOTE_OUTCOME } from "../../constants/votes";
import ProposalCardInfo from "./ProposalCardInfo";
import CustomModal from "../global/CustomModal";
import AddressList from "./AddressList";

/**
 * Component to show a proposal card with the info of a single proposal
 * @component
 * @subcategory Governance
 * @param {Object} proposal the single proposal passed from the father
 * @param {number} enabled the number of enabled masternodes
 * @param {Object} userInfo the info of the user currently logged in
 * @param {*} onLoadProposals loads the proposals list again after update a proposal
 * @example
 * const proposal = {}
 * const enabled = 1
 * const userInfo = {}
 * const onLoadProposals = () => {}
 * return (
 *  <ProposalCard proposal={proposal} enabled={enabled} userInfo={userInfo} onLoadProposals={onLoadProposals} />
 * )
 */
function ProposalCard({ proposal, enabled, userInfo, onLoadProposals }) {
  const { user } = useUser();

  const { t } = useTranslation();
  const [useCollapse, setUseCollapse] = useState(false);
  const [openAddressList, setOpenAddressList] = useState(false);
  const [days_remaining, setDays_remaining] = useState(0);
  const [month_remaining, setMonth_remaining] = useState(0);
  const [payment_type, setPayment_type] = useState("");
  const [vote, setVote] = useState("");
  const titleButtonRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  /**
   * UseEffect that calculates the approx payment dates of the current proposal
   * @function
   */
  useEffect(() => {
    let { end_epoch, nPayment } = proposal;
    const today = new Date();

    /**
     * Function that calculates the days remaining of the proposal
     * @function
     */
    const calculateDaysRemaining = () => {
      let endDate = new Date(end_epoch * 1000);
      if (endDate > today) {
        const timeDiff = endDate.getTime() - today.getTime();
        const days_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24);
        const month_remaining = Math.round(timeDiff / 1000 / 60 / 60 / 24 / 30);
        const payment_type = nPayment > 1 ? "per month" : "one-time payment";
        setDays_remaining(days_remaining);
        setMonth_remaining(month_remaining);
        setPayment_type(payment_type);
        endDate =
          endDate.getDate() +
          "/" +
          (parseInt(endDate.getMonth(), 10) + 1) +
          "/" +
          endDate.getFullYear();
      }
    };

    calculateDaysRemaining();

    return () => {
      calculateDaysRemaining();
    };
  }, [proposal]);

  

  /**
   * Function that receives a string of a number with , as separator and returns it without it
   * @function
   * @param {string} str string of a number
   */
  const comaToNum = (str) => {
    return Number(str.replace(",", ""));
  };

  /**
   * Function that returns a date in human format using the unix timestamps
   * @function
   * @param {number} creationTime number with a unix timestamp
   */
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

  /**
   * Function that returns html if the proposal is passing or not
   * @function
   * @param {number} yesCount
   * @param {number} noCount
   * @param {number} enabled
   * @param {number} absoluteYesCount
   */
  function proposalPassing(yesCount, noCount, enabled, absoluteYesCount) {
    if (((yesCount - noCount) / enabled) * 100 > 10) {
      return (
        <div className="passed" title={t("govlist.table.green_text")}>
          <i className="demo-icon icon-ok"></i> Passed
        </div>
      );
    } else {
      let need = parseInt(enabled / 10 - absoluteYesCount);
      let originalText = t("govlist.table.red_text");
      let newText = originalText.replace("[API]", need);
      return (
        <div className="not-passed" title={newText}>
          <i className="demo-icon icon-cancel-1"></i> Not passed
        </div>
      );
    }
  }

  /**
   * Function that verify the user and opens the addresses list modal to vote
   * @function
   * @param {number} vote type of the vote received from the button
   */
  function openMnVote(vote) {
    if (userInfo.emailVerified) {
      setVote(vote);
      setOpenAddressList(true);
    } else {
      swal.fire({
        icon: "info",
        title: "Verify your email",
        text: "You cannot vote if you haven´t verified your email address. Please go to your profile to verify.",
      });
    }
  }

  /**
   * Function used after vote that closes the addresses list modal and refresh the proposals list
   * @function
   */
  const afterVote = async () => {
    setOpenAddressList(false);
    await onLoadProposals();
  };

  return (
    <div className={`proposal ${useCollapse ? 'proposal--expanded' : ''}`} role="region" aria-labelledby={`proposal-title-${proposal.Hash}`}>
      <div className="vote-count">
        <span className="yes">{proposal.YesCount}</span>
        <span className="no">{proposal.NoCount}</span>
        {proposalPassing(
          proposal.YesCount,
          proposal.NoCount,
          comaToNum(enabled),
          proposal.AbsoluteYesCount
        )}
      </div>
      <div className="description">
        <div className="date">{proposalDate(proposal.CreationTime)}</div>

        <button
          id={`proposal-title-${proposal.Hash}`}
          ref={titleButtonRef}
          className={`proposal-title ${useCollapse ? 'expanded' : ''}`}
          aria-expanded={useCollapse}
          aria-controls={`proposal-details-${proposal.Hash}`}
          onClick={() => setUseCollapse(!useCollapse)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setUseCollapse(!useCollapse);
            }
          }}
          onTouchStart={(e) => {
            const t = e.changedTouches[0];
            touchStartX.current = t.clientX;
            touchStartY.current = t.clientY;
          }}
          onTouchEnd={(e) => {
            const t = e.changedTouches[0];
            const dx = t.clientX - (touchStartX.current ?? 0);
            const dy = t.clientY - (touchStartY.current ?? 0);
            if (Math.abs(dx) > 40 && Math.abs(dy) < 30) {
              setUseCollapse((prev) => !prev);
            }
          }}
        >
          <span className="proposal-title__text">{proposal.title || proposal.name}</span>
          <span className="proposal-title__icon" aria-hidden>{useCollapse ? '▾' : '▸'}</span>
        </button>

        <br />

        <div className="budget">
          {`${parseFloat(proposal.payment_amount * proposal.nPayment)} SYS`}{" "}
          <br />
          {`${parseFloat(proposal.payment_amount)} SYS/Month`} <br />
          {`${proposal.nPayment} Payment(s)`}
        </div>
        <Collapse
          isOpened={useCollapse}
          initialStyle={{ height: 0, overflow: "hidden" }}
        >
          <div className={"ReactCollapse--collapse"} id={`proposal-details-${proposal.Hash}`}>
            <ProposalCardInfo
              proposal={proposal}
              days_remaining={days_remaining}
              month_remaining={month_remaining}
              payment_type={payment_type}
            />
            <div className="proposal-back">
              <button
                className="btn btn--ghost"
                onClick={() => {
                  setUseCollapse(false);
                  titleButtonRef.current && titleButtonRef.current.focus();
                }}
                aria-label={t('govlist.back_to_proposals', 'Back to Proposals')}
              >
                ← {t('govlist.back_to_proposals', 'Back to Proposals')}
              </button>
            </div>
          </div>
        </Collapse>
      </div>
      {user && (
        <div className="actions">
          <button
            className="vote vote--yes"
            title={t("govlist.vote.yes_tooltip", "Vote YES - Support this proposal")}
            aria-label={t("govlist.vote.yes_aria", "Vote yes for this proposal")}
            disabled={userInfo ? false : true}
            onClick={() => openMnVote(VOTE_OUTCOME.YES)}
          >
            <span className="vote-emoji">👍</span>
            <span className="vote-label">{t("govlist.vote.yes", "Vote Yes")}</span>
          </button>
          <button
            className="vote vote--abstain"
            title={t("govlist.vote.abstain_tooltip", "ABSTAIN - Neutral vote")}
            aria-label={t("govlist.vote.abstain_aria", "Abstain from voting on this proposal")}
            disabled={userInfo ? false : true}
            onClick={() => openMnVote(VOTE_OUTCOME.ABSTAIN)}
          >
            <span className="vote-emoji">➖</span>
            <span className="vote-label">{t("govlist.vote.abstain", "Abstain")}</span>
          </button>
          <button
            className="vote vote--no"
            title={t("govlist.vote.no_tooltip", "Vote NO - Reject this proposal")}
            aria-label={t("govlist.vote.no_aria", "Vote no for this proposal")}
            disabled={userInfo ? false : true}
            onClick={() => openMnVote(VOTE_OUTCOME.NO)}
          >
            <span className="vote-emoji">👎</span>
            <span className="vote-label">{t("govlist.vote.no", "Vote No")}</span>
          </button>
        </div>
      )}
      <CustomModal
        open={openAddressList}
        onClose={() => setOpenAddressList(false)}
      >
        <AddressList proposal={proposal} vote={vote} onAfterVote={afterVote} />
      </CustomModal>
    </div>
  );
}
export default ProposalCard;
