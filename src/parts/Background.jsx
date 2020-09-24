import React from 'react';

const Background = (props) => {
  return (
    <div className="main main--gradient">
      {props.children}
    </div>
  )
}

export default Background;
