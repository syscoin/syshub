import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import swal from 'sweetalert';

import { fire } from '../../firebase';
import {
  AppHeader,
  AppContent,
  AppSlider,
  AppFooter,
  LoginTest,
  RegisterTest
} from '../containers/';
// Styles
import { HeaderStyles, SiderStyles, ContentStyles, FooterStyles } from '../../styles';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class DesktopLayout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
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
            icon: 'success'
          });
          this.setState({ currentUser: null });
        }
      });
  }

  render() {
    return (
      <Layout>
        <Header style={HeaderStyles.headerWraper}>
          <AppHeader />
        </Header>
        <Layout>
          <Sider width={200} style={SiderStyles.siderWraper}>
            <AppSlider />
          </Sider>
          <Layout>
            <Content style={ContentStyles.contentWraper}>
              <AppContent />
              {this.state.currentUser ? (
                <div>
                  <h2>{this.state.currentUser.displayName || this.state.currentUser.email}</h2>
                  <button onClick={this.logout}>Logout</button>
                </div>
              ) : (
                <div>
                  <LoginTest /> <RegisterTest />
                </div>
              )}
            </Content>
          </Layout>
        </Layout>
        <Footer style={FooterStyles.footerWraper}>
          <AppFooter />
        </Footer>
      </Layout>
    );
  }
}

export default DesktopLayout;
