import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class StatsShow extends Component {
  state = {
    dataload: 1
  };
  
  render() {
    if (this.state.dataload === 1) {
      return <div></div>;
    } else {
      return <p></p>;
    }
  }
}

export default withTranslation()(StatsShow);
