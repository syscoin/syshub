import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import GridList, { GridListTile } from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';

// import style
import { welcomeBoxStyle } from './styles';

class WelcomeBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;
    const logo = require('../../assets/img/png_logo.png');

    return (
      <div className={classes.root}>
        <Paper className="Paper" elevation={4}>
          <GridList cols={2} cellHeight={300}>
            <GridListTile>
              <div className="logoDiv">
                <img src={logo} height="250" />
              </div>
            </GridListTile>
            <GridListTile>
              <h1 className="heading">Advertisement Text here</h1>
              <Divider />
              <div className="addvertiseText">
                <ul className="wellcomBoxTextList">
                  <li className="listItem">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
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
              <div className="joinBtn">
                <Button
                  raised
                  className="btn"
                  onClick={this.props.onJoin}
                  disabled={this.props.logged}
                >
                  <span className="btnText"> Join SysHub </span>
                </Button>
              </div>
            </GridListTile>
          </GridList>
        </Paper>
      </div>
    );
  }
}

WelcomeBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(welcomeBoxStyle)(WelcomeBox);
