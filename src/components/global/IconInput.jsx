import React from "react";
import ReactTooltip from "react-tooltip";

const iconStyle = {
  position: "absolute",
  bottom: "14.5px",
  right: "0",
  cursor: "pointer",
  padding: "1px",
};
const IconInput = ({ dataId, children: content }) => {
  return (
    <i
      class="icon-info"
      style={iconStyle}
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
