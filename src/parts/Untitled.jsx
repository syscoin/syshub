import React, { Component } from "react";

export default class Untitled extends Component {
  render() {
    return (
      <div>

                    <div class="main__backgrounds">
                        <div class="main__gradient"></div>
                        <div class="main__background main__background--top-right" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/main-background-top-right.png);`}}></div>
                        <div class="main__background main__background--oval-top-right-secondary" style={{backgroundImage: "url(assets/images/main-background-oval-top-right-secondary.png);"}}></div>
                        <div class="main__background main__background--top-left" style={{backgroundImage: "url(assets/images/main-background-top-left.png);"}}></div>
                        <div class="main__background main__background--top-gradient" style={{backgroundImage: "url(assets/images/main-background-top.png);"}}></div>
                        <div class="main__background main__background--half-oval-left" style={{backgroundImage: "url(assets/images/main-background-half-oval-left.png);"}}></div>
                        <div class="main__background main__background--ornament-top-secondary" style={{backgroundImage: "url(assets/images/main-background-ornament-top-secondary.png);"}}></div>
                        <div class="main__background main__background--wave-radar-bottom" style={{backgroundImage: "url(assets/images/main-background-wave-radar-bottom.png);"}}></div>
                    </div>

      </div>
    );
  }
}
