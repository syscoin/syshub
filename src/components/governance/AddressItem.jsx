import React, { useState } from 'react';
import swal from 'sweetalert2';

/**
 * Component that shows a singular address inside the list of addresses
 * @component
 * @subcategory Governance
 * @param {Object} address the address inside the list
 * @param {*} onAddAddress function that adds the address to the selected addresses
 * @param {*} onRemoveAddress function that removes the address from the selected addresses
 * @param {string} hash hash of the proposal used to verify previous votes on this proposal
 * @param {number} vote type of vote used to verify previous votes on this proposal
 * @example
 * const address = {}
 * const onAddAddress = () => {}
 * const onRemoveAddress = () => {}
 * const hash = ''
 * const vote = 1
 * return (
 *  <AddressItem address={address} onAddAddress={onAddAddress} onRemoveAddress={onRemoveAddress} hash={hash} vote={vote} />
 * )
 */
const AddressItem = ({ address, onAddAddress, onRemoveAddress, hash, vote }) => {
  const [selected, setSelected] = useState(false);

  /**
   * Function that checks if this address has been used to vote in this proposal with the same type of vote and toggles the state between selected or not selected.
   * @function
   */
  function toggle() {
    if (!selected) {
      if (address.proposalVotes) {
        const alreadyVoted = address.proposalVotes.find(mnVote => {
          if (mnVote.hash === hash) {
            if (mnVote.vote === String(vote)) return true;
            return false;
          }
          return false;
        })
        if (alreadyVoted) {
          swal.fire({
            icon: 'info',
            title: 'You already voted this option with this address'
          });
        }
        else {
          onAddAddress(address);
          setSelected(!selected);
        }
      }
      else {
        onAddAddress(address);
        setSelected(!selected);
      }
    }
    else {
      onRemoveAddress(address.uid);
      setSelected(!selected);
    }
  }
  return (
    <li onClick={toggle} className={`masternodes-list ${selected ? 'active': ''}`}>
      <label style={{textTransform: 'capitalize', cursor: 'pointer'}}>
        {address.name}
      </label>
    </li>
  )
}

export default AddressItem;