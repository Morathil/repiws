"use strict"

var React = require("react");

var UserActions = require("./../actions/UserActions");
var ItemActions = require("../actions/ItemActions");
var ViewActions = require("../actions/ViewActions");

var UserStore = require("./../stores/UserStore");

var Menu = React.createClass({
  getInitialState: function() {
    return {
      currentUser: UserStore.get()
    };
  },

  componentWillMount: function() {
    UserStore.on("change", this._onUserStoreChange);
  },

  componentWillUnmount: function() {
    UserStore.off("change", this._onUserStoreChange);
  },

  render: function() {
    if (!this.state.currentUser) {
      return null;
    }

    return (
      <div className="menu-content">
        <div onClick={this._logout}>
          <span>LOGOUT</span>
          <i className={"fa fa-sign-out fa-2x"}></i>
        </div>
        <div onClick={this._showItems}>
          <span>ITEMS</span>
          <i className={"fa fa-cloud-download fa-2x"}></i>
        </div>
        <div onClick={this._showLikes}>
          <span>LIKES</span>
          <i className={"fa fa-cloud-download fa-2x"}></i>
        </div>
        <div onClick={this._refresh}>
          <span>REFRESH DATA</span>
          <i className={"fa fa-cloud-download fa-2x"}></i>
        </div>
      </div>
    );
  },

  _logout: function() {
    UserActions.logout();
  },

  _refresh: function() {
    ItemActions.refresh();
  },

  _showLikes: function() {
    ViewActions.showLikes();
  },

  _showItems: function() {
    ViewActions.showItems();
  },

  _onUserStoreChange: function() {
    this.setState({
      currentUser: UserStore.get()
    });
  }
});

module.exports = Menu;
