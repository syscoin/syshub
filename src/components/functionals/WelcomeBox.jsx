import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { GridList, GridListTile } from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

// import style
import { welcomeBoxStyle } from './styles';

class WelcomeBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      minHeight: '100px',
      width: '100px',
      margin: '20px 5px',
      display: 'inline-block',
      boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 30px',
      width: '100%',
      padding: '20px',
    };

    return (
      <div className="welcomeBox__container">
        <Paper style={style} elevation={4}>
          <GridList cols={2} cellHeight={300}>
            <GridListTile>
              <div style={welcomeBoxStyle.logoImg} style={{ textAlign: 'center' }}>
                <img
                  src={require('../../assets/img/png_logo.png')}
                  height="250"
                />
              </div>
            </GridListTile>
            <GridListTile>
              <h1 style={{ color: '#3498db' }}>Advertisement Text here</h1>
              <Divider />
              <div style={welcomeBoxStyle.addvertiseText}>
                <ul style={welcomeBoxStyle.wellcomBoxTextList}>
                  <li style={welcomeBoxStyle.listItem}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                  </li>
                  <li style={welcomeBoxStyle.listItem}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                  </li>
                  <li style={welcomeBoxStyle.listItem}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                  </li>
                  <li style={welcomeBoxStyle.listItem}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                  </li>
                </ul>
              </div>
              <div style={welcomeBoxStyle.joinBtn}>
                <Button
                  raised
                  color="primary"
                  style={welcomeBoxStyle.btn}
                  onClick={this.props.onJoin}
                  disabled={this.props.logged}
                >
                  <span style={welcomeBoxStyle.btnText}> Join SysHub </span>
                </Button>
              </div>
            </GridListTile>
          </GridList>
        </Paper>
      </div>
    );
  }
}

export default WelcomeBox;
