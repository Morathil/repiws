"use strict"

var React = require("react");

var UserActions = require("./../actions/UserActions");
var UserStore = require("./../stores/UserStore");

var BurgerMenu = require("./BurgerMenu.jsx");

var Register = React.createClass({
  getInitialState: function() {
    return this._getData()
  },

  componentWillMount: function() {
    UserStore.on("change", this._onUserStoreChange);
  },

  componentWillUnmount: function() {
    UserStore.off("change", this._onUserStoreChange);
  },

  render: function() {
    return (
      <div className="login">
        <BurgerMenu style="back" backView={"Login"} />
        <i className={"fa fa-user fa-2x"}></i>
        <input type="text" placeholder="Username" onChange={this._onUsername} />
        <br />
        <i className={"fa fa-lock fa-2x"}></i>
        <input type="password" placeholder="Password" onChange={this._onPassword} />
        <br />
        <i className={"fa fa-lock fa-2x"}></i>
        <input type="password" placeholder="Repeat password" onChange={this._onPassword} />
        <br />
        <i className={"fa fa-sign-in fa-2x"}></i>
        <span onClick={this._register} className="loginButton"> REGISTER</span>
      </div>
    );
  },

  _register: function() {
    UserActions.register({
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

module.exports = Register;
