import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import GridList, { GridListTile } from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

// import style
import { welcomeBoxStyle } from './styles';

class WelcomeBox extends Component {
  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const logo = require('../../assets/img/png_logo.png');

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
              <h1 className="heading">Advertisement Text here</h1>
              <Divider />
              <div className="addvertiseText">
                <ul className="wellcomBoxTextList">
                  <li className="listItem">
                    The proposal generator has been updated to support 12.2 proposal submissions.{' '}
                  </li>
                  <li className="listItem">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                  </li>
                  <li className="listItem">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                  </li>
                  <li className="listItem">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                  </li>
                </ul>
              </div>
            </GridListTile>
          </GridList>
          {!this.props.logged && (
            <div className="joinBtn">
              <Button raised className="btn" onClick={this.props.onJoin}>
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

export default withStyles(welcomeBoxStyle)(WelcomeBox);
