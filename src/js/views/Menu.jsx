"use strict"

var React = require("react");

var UserActions = require("./../actions/UserActions");
var UserStore = require("./../stores/UserStore");

var ItemActions = require("../actions/ItemActions");
var ItemStore = require("../stores/ItemStore");

var Menu = React.createClass({
  getInitialState: function() {
    return this._getData()
  },

  componentWillMount: function() {
    UserStore.on("change", this._onUserStoreChange);
  },

  render: function() {
    var sessionText = this.state.currentUser ? "LOGOUT" : "LOGIN";
    var sessionAction = this.state.currentUser ? this._logout : this._login;

    return (
      <div className="menu-content">
        <div onClick={sessionAction}>{sessionText}</div>
        <div onClick={this._refresh}>REFRESH DATA</div>
      </div>
    );
  },

  _facebookLogin: function() {
    UserActions.facebookLogin();
  },

  _login: function() {
    UserActions.login({
      userName: "1234",
      password: "1234"
    });
  },

  _logout: function() {
    UserActions.logout();
  },

  _getData: function() {
    return {
      currentUser: UserStore.get()
    };
  },

  _refresh: function() {
    ItemActions.refresh();
  },

  _onUserStoreChange: function() {
    this.setState(this._getData());
  }
});

module.exports = Menu;
