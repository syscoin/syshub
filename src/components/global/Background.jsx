import React from 'react';

/**
 * Component for showing the Main Backgrounds
 * @component
 * @subcategory Global
 */
const Background = (props) => {
  return (
    <div className="main main--gradient">
      {props.children}
    </div>
  )
}

export default Background;
