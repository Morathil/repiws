"use strict"

var React = require("react");

var UserActions = require("./../actions/UserActions");
var UserStore = require("./../stores/UserStore");

var Login = React.createClass({
  getInitialState: function() {
    return this._getData()
  },

  componentWillMount: function() {
    UserStore.on("change", this._onUserStoreChange);
  },

  render: function() {
    return (
      <div className="login">
        <i className={"fa fa-user fa-2x"}></i>
        <input type="text" placeholder="Username" onChange={this._onUsername} />
        <br />
        <i className={"fa fa-lock fa-2x"}></i>
        <input type="password" placeholder="Password" onChange={this._onPassword} />
        <br />
        <i className={"fa fa-sign-in fa-2x"}></i>
        <span onClick={this._login} className="loginButton"> LOGIN</span>
      </div>
    );
  },

  _facebookLogin: function() {
    UserActions.facebookLogin();
  },

  _login: function() {
    console.log(this.state.username);
    UserActions.login({
      userName: this.state.username,
      password: this.state.password
    });
  },

  _getData: function() {
    return {
      currentUser: UserStore.get()
    };
  },

  _onUserStoreChange: function() {
    this.setState(this._getData());
  },

  _onUsername: function(event) {
    this.setState({
      username: event.target.value
    });
  },

  _onPassword: function(event) {
    this.setState({
      password: event.target.value
    });
  }
});

module.exports = Login;
