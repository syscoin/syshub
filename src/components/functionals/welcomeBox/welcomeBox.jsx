import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

// import style
import { welcomeBoxStyle } from '../styles';

class WelcomeBox extends Component {
  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const logo = require('../../../assets/img/png_logo2.png');

    return (
      <div className={style}>
        <Paper className="Paper" elevation={4}>
          <GridList cols={5}>
            <GridListTile cols={deviceType === 'mobile' ? 5 : 2} className="tile__wrapper logo">
              <div className="logoDiv">
                <img alt="a" src={logo} />
              </div>
            </GridListTile>
            <GridListTile cols={deviceType === 'mobile' ? 5 : 3} className="tile__wrapper">
              <h1 className="heading">In Case You Missed It</h1>
              <Divider />
              <div className="addvertiseText">
                <ul className="wellcomBoxTextList">
                  <li className="listItem">
                    4 new proposals has been submitted.{' '}
                  </li>
                  <li className="listItem">
                    142 masternodes has been added.
                  </li>
                  <li className="listItem">
                    SBIN remain budget: 129217 SYS.
                  </li>
                  <li className="listItem">
                    1 new post by Blockchain Foundry. 
                  </li>
                </ul>
              </div>
            </GridListTile>
          </GridList>
          {!this.props.logged && (
            <div className="joinBtn">
              <Button variant= 'raised' className="btn" onClick={this.props.onJoin}>
                <span className="btnText"> Join SysHub </span>
              </Button>
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

WelcomeBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(welcomeBoxStyle)(WelcomeBox);
