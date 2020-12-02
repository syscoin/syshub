import React, { useState } from 'react';
import swal from 'sweetalert2';

/**
 * Component that shows a singular masternode inside the list of masternodes
 * @component
 * @subcategory Governance
 * @param {Object} mn the masternode inside the list
 * @param {*} onAddMN function that adds the mn to the selected masternodes
 * @param {*} onRemoveMN function that removes the mn from the selected masternodes
 * @param {string} hash hash of the proposal used to verify previous votes on this proposal
 * @param {number} vote type of vote used to verify previous votes on this proposal
 * @example
 * const mn = {}
 * const onAddMN = () => {}
 * const onRemoveMN = () => {}
 * const hash = ''
 * const vote = 1
 * return (
 *  <MnItem mn={mn} onAddMN={onAddMn} onRemoveMN={OnRemoveMN} hash={hash} vote={vote} />
 * )
 */
const MnItem = ({ mn, onAddMN, onRemoveMN, hash, vote }) => {
  const [selected, setSelected] = useState(false);

  /**
   * Function that toggles the state between selected or not selected.
   * It also checks if this mn has been used to vote in this proposal with the same type of vote
   * @function
   */
  function toggle() {
    if (!selected) {
      if (mn.proposalVotes) {
        const alreadyVoted = mn.proposalVotes.find(mnVote => {
          if (mnVote.hash === hash) {
            if (mnVote.vote === String(vote)) return true;
            return false;
          }
          return false;
        })
        if (alreadyVoted) {
          swal.fire({
            icon: 'info',
            title: 'You already voted this option with this masternode'
          });
        }
        else {
          onAddMN(mn);
          setSelected(!selected);
        }
      }
      else {
        onAddMN(mn);
        setSelected(!selected);
      }
    }
    else {
      onRemoveMN(mn.uid);
      setSelected(!selected);
    }
  }
  return (
    <li onClick={toggle} className={`masternodes-list ${selected ? 'active': ''}`}>
      <label style={{textTransform: 'capitalize', cursor: 'pointer'}}>
        {mn.name}
      </label>
    </li>
  )
}

export default MnItem;