import React, { Component } from 'react';

// import components
import Stats from "../functionals/stats";
import WellcomeBox from "../functionals/wellcomeBox";
import Login from "./login";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 'home'
    }
    this.changeState = this.changeState.bind(this)
  }

  changeState() {
    this.setState({ pageState: 'login' })
  }

  render() {
    return (
      <div className="home__container">
        {
          this.state.pageState === 'home' ? <div>
            <WellcomeBox login={this.state.pageState} changeState={this.changeState} />
            <Stats />
          </div>
            : <Login />
        }
      </div>)

  }
}


export default Home;
