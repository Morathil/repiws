"use strict"

var React = require("react");

var UserActions = require("./../actions/UserActions");
var ItemActions = require("../actions/ItemActions");

var Menu = React.createClass({
  render: function() {
    return (
      <div className="menu-content">
        <div onClick={this._logout}>
          <span>LOGOUT</span>
          <i className={"fa fa-sign-out fa-2x"}></i>
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
  }
});

module.exports = Menu;
