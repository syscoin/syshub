import React, { useState } from 'react';
import swal from 'sweetalert2';

export default function MnItem({ mn, onAddMN, onRemoveMN, hash, vote }) {
  const [selected, setSelected] = useState(false);

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
