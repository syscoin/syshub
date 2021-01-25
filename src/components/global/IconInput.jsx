import React from "react";
import ReactTooltip from "react-tooltip";

const iconStyle = {
  position: "absolute",
  top: "50%",
  marginTop: "-0.55em",
  right: "0",
  cursor: "pointer",
  padding: "1px",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
const IconInput = ({ dataId, marginRight, children: content }) => {
  return (
    <i
      className="icon-info"
      style={{...iconStyle, marginRight: marginRight ? '20px' : ''}}
      data-tip data-for={`${dataId}-info-icon`}
    >
      <ReactTooltip
        id={`${dataId}-info-icon`}
        aria-haspopup="true"
        className="tooltipSysClass"
        backgroundColor="#242652"
      >
        {content}
      </ReactTooltip>
    </i>
  );
};

export default IconInput;
