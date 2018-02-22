/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import SiderLogo from './SiderLogo';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui';
import { doLogout } from '../../API/firebase';

//ReduxActions
import actions from '../../redux/actions';


import { siderMenuStyle } from './styles';

class SiderMenu extends Component {
  activeComponemt(pageActive) {
    if(pageActive == 'logout'){
      doLogout();
      this.props.doLogout();
      this.props.onItemClick('home');
    }else{
      this.props.onItemClick(pageActive);
    }
  }

  render() {
    const { classes, active, deviceType } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    return (
      <div className={style}>
        {this.props.deviceType !== 'mobile' && <SiderLogo />}
        {this.props.menuItems.map((item, i) => {
          const icon = item.key === active ? item.iconSelected : item.icon;
          const txt = item.key === active ? classes.menuTxtActive : classes.menuTxt;
          const btnStyle = item.key === active ? classes.buttonActive : classes.button;
          let showMe = item.private;
          switch (item.showWhen) {
            case 'always':
              showMe = true;
              break;
            case 'login':
              showMe = this.props.logged;
              break;
            case 'logout':
              showMe = !this.props.logged;
              break;
            default:
              showMe = true;
          }
          if (item.key === active) {
            document.title = `Syshub | ${item.pageTitle}`;
          } else if (active === 'home') {
            document.title = 'Syshub';
          }
          return showMe && (item.showPlatform == 'all' || item.showPlatform == this.props.deviceType) ? (
            <button key={i} className={btnStyle} onClick={() => this.activeComponemt(item.key)}>
              <img
                alt="a"
                src={require(`../../assets/img/${icon}.png`)}
                width="25"
                style={deviceType === 'mobile' ? { marginLeft: 15 } : null}
              />
              <span className={txt}>{`${item.title.toUpperCase()}`}</span>
            </button>
          ) : null;
        })}

        <div className={classes.lastBorder} />
        {/*Last border*/}
      </div>
    );
  }
}
const stateToProps = state => {
  return {
    menuItems: state.app.menuItems
  };
};

const dispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(actions.doLogout())
  };
};

export default connect(stateToProps, dispatchToProps)(withStyles(siderMenuStyle)(SiderMenu));
