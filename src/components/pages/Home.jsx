import React, { Component } from 'react';

// import components
import { Stats, WelcomeBox } from '../functionals';
class Home extends Component {
  render() {
    return (
      <div>
        <WelcomeBox />
        <Stats />
      </div>
    );
  }
}

export default Home;
