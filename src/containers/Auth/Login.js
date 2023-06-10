import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { handleLogin } from "../../services/userService";

class Login extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnchangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnchangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      const data = await handleLogin(this.state.username, this.state.password);

      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }

      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login ok");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowHiddenPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-backgroud">
        <div className="login-container">
          <div className="login-content row">
            <h2 className="col-12 login-text">Login</h2>
            <div className="col-12 form-group login-input">
              <label>UserName</label>
              <input
                type="text"
                className="form-control"
                autoComplete="new-password"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(e) => this.handleOnchangeUsername(e)}
              />
            </div>

            <div className="col-12 form-group login-input">
              <label>Password</label>
              <div className="form-custom">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(e) => this.handleOnchangePassword(e)}
                />
                <span
                  onClick={() => {
                    this.handleShowHiddenPassword();
                  }}
                >
                  <i
                    class={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>

            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>

            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>

            <div className="col-12">
              <Link to="/" className="fg-password">
                Forgot your password?
              </Link>
            </div>

            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login with:</span>
            </div>

            <div className="social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
