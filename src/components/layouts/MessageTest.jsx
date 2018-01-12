import React, { Component } from 'react';

export default props => {
  return (
    <div>
      <h4>
        <div style={{ fontSize: '16px' }}>{props.message.body}</div>
        <div style={{ fontSize: '10px', color: 'grey' }}>{props.message.user.displayName}</div>
        <hr />
      </h4>
    </div>
  );
};
