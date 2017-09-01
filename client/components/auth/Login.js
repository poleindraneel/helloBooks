import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row } from 'react-materialize';

import Header from '../header/Header';
import { login } from '../../actions/login';

/*
  eslint-disable
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.login(this.state)
    .then(
      () => this.setState({ shouldRedirect: true }),
      (error) => Materialize.toast(error.response.data.message, 4000, 'red')
    )
    .catch((err) => {
        this.setState({ isLoading: false });
      });
  }

  handleChange(event) {
    event.preventDefault();
    const formField = event.target.name;
    const user = Object.assign({}, this.state);
    user[formField] = event.target.value;
    this.setState(() => user);
  }

  render() {
    return (
      this.state.shouldRedirect ?
      <Redirect to='/dashboard'/> :
      <div>
        <Header
          navLinks={['login', 'sign up', 'library']}
        />
        <main>
          <section className="account">
            <Row>
              <div className="container">
                <div className="center">
                  <div className="col m6 s12 welcome">
                    <h2>Hello Reader</h2>
                    <h6>Welcome home avid reader</h6>
                  </div>
                  <div className="col m6 s12">
                    <form onSubmit={this.handleLogin}>
                      <div className="col s12">
                        <h5>Login</h5>
                      </div>
                      <div className="col s12">
                        <div className="container">
                          <div className="input-field">
                            <input type="text"
                              name="username"
                              placeholder="Username"
                              className="validate"
                              required
                              title="username is required for login"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input type="password"
                              name="password"
                              placeholder="password"
                              className="validate"
                              required
                              title="password is required for login"
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="input-field">
                            <input
                              type="submit"
                              name="submit"
                              value="LOGIN"
                              className="btn waves-effect waves-light"
                            />
                          </div>
                          <div className="">
                            <p>Don&apos;t have an account?
                              <Link to="/signup"> Sign up</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Row>
          </section>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};


export default connect(null, { login })(Login);
