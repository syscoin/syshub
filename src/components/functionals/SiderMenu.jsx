/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Row, Col } from 'antd';

// API
import { doLogout } from '../../API/firebase';

//ReduxActions
import actions from '../../redux/actions';

// Components
import SiderLogo from './SiderLogo';

import { siderMenuStyle } from './styles';

class SiderMenu extends Component {
  activeComponemt(pageActive) {
    if (pageActive === 'logout') {
      doLogout();
      this.props.doLogout();
      this.props.onItemClick('home');
    } else {
      this.props.onItemClick(pageActive);
    }
  }

  render() {
    const { classes, active, deviceType, sysStatsValue } = this.props;
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const changeRate = sysStatsValue ? `${(this.props.sysStatsValue.exchange_rates.btc_dash
    ).toFixed(5)} BTC/SYS` : '';
    const masternodes = sysStatsValue ? `${
      this.props.sysStatsValue.general.registered_masternodes_verified
      } / ${this.props.sysStatsValue.general.registered_masternodes}` : '';
    const totUsers = sysStatsValue ? this.props.sysStatsValue.general.all_user : '';

    return (
      <div className={style}>
        {this.props.deviceType !== 'mobile' && <SiderLogo />}
        {this.props.deviceType === 'mobile' && <Row className='stats__container'>
          <Col span={15} className='stats__wrapper'>
            <img alt="a" src={require('../../assets/img/png_stasts_sys.png')} className="icon" />
            <span> <b>{`SYSCOIN: `}</b> {changeRate}</span>
          </Col>
          <Col span={9} className='stats__wrapper'>
            <img alt="a" src={require('../../assets/img/png_stats_users.png')} className="icon" />
            <span><b>{`USERS: `}</b> {totUsers}</span>
          </Col>
          <Col span={24} className='stats__wrapper'>
            <img alt="a" src={require('../../assets/img/png_stats_masternodes.png')} className="icon" />
            <span><b>{`REGISTERED MASTERNODES: `}</b> {masternodes}</span>
          </Col>
        </Row>}
        {this.props.menuItems.map((item, i) => {
          const icon = item.key === active ? item.iconSelected : item.icon;
          const txt = item.key === active ? classes.menuTxtActive : classes.menuTxt;
          const btnStyle = item.key === active ? classes.buttonActive : classes.button;
          let showMe = item.private;
          switch (item.showWhen) {
            case 'always':
              showMe = true;
              break;
            case 'never':
              showMe = false;
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
          return showMe && (item.showPlatform === 'all' || item.showPlatform === this.props.deviceType) ? (
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
    menuItems: state.app.menuItems,
    sysStatsValue: state.sysStats.value
  };
};

const dispatchToProps = dispatch => {
  return {
    doLogout: () => dispatch(actions.doLogout())
  };
};

export default connect(stateToProps, dispatchToProps)(injectSheet(siderMenuStyle)(SiderMenu));
