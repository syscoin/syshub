import React from 'react';

const BackgroundInner = ({type}) => {
  if (type === 'A') {
    return (
      <div className="main__backgrounds">
        <div className="main__gradient"></div>
        <div className="main__background main__background--top-right" style={{ backgroundImage: "url(assets/images/main-background-top-right.png)" }}></div>
        <div className="main__background main__background--oval-top-right-secondary" style={{ backgroundImage: "url(assets/images/main-background-oval-top-right-secondary.png)" }}></div>
        <div className="main__background main__background--top-left" style={{ backgroundImage: "url(assets/images/main-background-top-left.png)" }}></div>
        <div className="main__background main__background--top-gradient" style={{ backgroundImage: "url(assets/images/main-background-top.png)" }}></div>
        <div className="main__background main__background--half-oval-left" style={{ backgroundImage: "url(assets/images/main-background-half-oval-left.png)" }}></div>
        <div className="main__background main__background--ornament-top-secondary" style={{ backgroundImage: "url(assets/images/main-background-ornament-top-secondary.png)" }}></div>
        <div className="main__background main__background--wave-radar-bottom" style={{ backgroundImage: "url(assets/images/main-background-wave-radar-bottom.png)" }}></div>
      </div>
    );
  }
  if (type === 'B') {
    return (
      <div className="main__backgrounds">
        <div className="main__gradient"></div>
        <div className="main__background main__background--top-right" style={{backgroundImage: "url(assets/images/main-background-top-right.png)"}}></div>
        <div className="main__background main__background--oval-top-right-secondary" style={{backgroundImage: "url(assets/images/main-background-oval-top-right-secondary.png)"}}></div>
        <div className="main__background main__background--top-left" style={{backgroundImage: "url(assets/images/main-background-top-left.png)"}}></div>
        <div className="main__background main__background--top-gradient" style={{backgroundImage: "url(assets/images/main-background-top.png)"}}></div>
        <div className="main__background main__background--half-oval-left" style={{backgroundImage: "url(assets/images/main-background-half-oval-left.png)"}}></div>
        <div className="main__background main__background--wave-radar-bottom" style={{backgroundImage: "url(assets/images/main-background-wave-radar-bottom.png)"}}></div>
      </div>
    );
  }

  return (
    <div className="main__backgrounds">
      <div className="main__gradient"></div>
      <div className="main__background main__background--top-right" style={{backgroundImage: "url(assets/images/main-background-top-right.png)"}}></div>
      <div className="main__background main__background--top-left" style={{backgroundImage: "url(assets/images/main-background-top-left.png)"}}></div>
      <div className="main__background main__background--top-gradient" style={{backgroundImage: "url(assets/images/main-background-top.png)"}}></div>
    </div>
  );
}

export default BackgroundInner;