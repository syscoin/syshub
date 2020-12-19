import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

/**
 * Component that customizes the Modal from react-responsive-modal
 * @component
 * @subcategory Global
 * @param {*} props props to close and open the Modal, and the children
 */

export default function CustomModal(props) {
  return (
    <Modal
      {...props}
      center
      styles={{
        modal: {
          background: '#242652',
          borderRadius: '5px',
          WebkitBorderRadius: '5px',
          MozBorderRadius: '5px'
        },
        closeButton: { fill: '#D3DFFF' }
      }}
      blockScroll={false}
    >
      <div className="article">
        {props.children}
      </div>
    </Modal>
  );
}
