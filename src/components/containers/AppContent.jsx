/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import WithRoot from './WithRoot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-scroll';
import swal from 'sweetalert';

import { Layout } from 'antd';
import { fire } from '../../firebase';

//Import functionals components
import { LoginTest, RegisterTest } from '../pages';

//Import Styles
import { ContentStyle } from './styles';
//import EmailModal from './the-modal';

const { Content } = Layout;

class AppContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
    });
  }

  logout() {
    fire
      .auth()
      .signOut()
      .then(() => {
        if (this.state.currentUser !== null) {
          swal({
            title: 'success',
            text: 'Successfully logged out.',
            icon: 'success',
          });
          this.setState({ currentUser: null });
        }
      });
  }

  render() {
    return (
      <div>
        <Content style={ContentStyle.contentWraper}>
          {this.state.currentUser ? (
            <div>
              <h2>
                {this.state.currentUser.displayName ||
                  this.state.currentUser.email}
              </h2>
              <button onClick={this.logout}>Logout</button>
            </div>
          ) : (
            <div>
              <LoginTest /> <RegisterTest />
            </div>
          )}{' '}
        </Content>
      </div>
    );
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WithRoot(AppContent);
