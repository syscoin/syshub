import React, {Component} from "react";
import {MetaTags} from "react-meta-tags";
import {withTranslation} from "react-i18next";

import {login} from '../utils/request';

import Background from "../parts/Background";
import BackgroundInner from "../parts/BackgroundInner";
import Title from "./partials/Title";
import LoginForm from "./partials/LoginForm";
import {Link} from "react-router-dom";


class Login extends Component {

  state = {
    submitting: false,
    responseData: null,
    error: null
  }

  onLogin = async (loginData) => {
    this.setState({submitting: true});
    const response = await login(loginData);
    console.log(response)
    if (response.error) {
      this.setState({error: response.error});
    }

    this.setState({submitting: false});
  }

  render() {
    const {t} = this.props;
    return (
      <Background>
        <BackgroundInner/>
        <main className="section loginPage">
          <MetaTags>
            <title> {t("login.meta.title")} </title>
            <meta name="keywords" content={t("login.meta.keywords")}/>
            <meta name="description" content={t("login.meta.description")}/>
          </MetaTags>
          <div className="shell-large">
            <div className="section__body">
              <div className="articles">
                <section className="article">
                  <div className="cols">
                    <div className="col col--size-12">
                      <div className="article__content article__content--pull-left text-center">
                        <Title heading="Login" />
                        {this.state.error && (
                          <p>{this.state.error.message}</p>
                        )}
                        <LoginForm onLogin={this.onLogin} submitting={this.state.submitting}/>
                        <p></p>
                        <div className="input-cont">
                          <Link to="/recover">Forgot your password?</Link> <br/>
                          <Link to="/register">Don't have an account?</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

      </Background>
    );
  }
}

export default withTranslation()(Login);
