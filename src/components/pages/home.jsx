import React, { Component } from 'react';

// import components
import Stats from "../functionals/stats";
import WellcomeBox from "../functionals/wellcomeBox";
class Home extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="home__container">
        <WellcomeBox />
        <Stats />
      </div>
    )
  }
}


export default Home;
