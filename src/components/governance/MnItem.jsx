import React, { useState } from 'react';

export default function MnItem({ mn, onAddMN, onRemoveMN }) {
  const [selected, setSelected] = useState(false);

  function toggle() {
    if (!selected) {
      onAddMN(mn);
    }
    else {
      onRemoveMN(mn.uid);
    }
    
    setSelected(!selected);
  }
  return (
    <li onClick={toggle} className={`masternodes-list ${selected ? 'active': ''}`}>
      <label style={{textTransform: 'capitalize'}}>
        {mn.name}
      </label>
    </li>
  )
}
