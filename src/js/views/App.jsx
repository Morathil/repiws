"use strict"

var React = require("react");
var MenuSet = require("./SlidingMenu.jsx");

var UserActions = require("./../actions/UserActions");
var UserStore = require("./../stores/UserStore");

var Menu = MenuSet.Menu;
var MenuItem = MenuSet.MenuItem;
var Deck = require("./Deck.jsx");

var height = {
  height: "100%"
};

var posAbs = {
  position: "absolute"
};

var zindex = {
  zIndex: 2
}

var contentStyle = {
  zIndex: 2,
  position: "absolute",
  right: "0px"
}

var Repiws = React.createClass({
  getInitialState: function() {
    return this._getData()
  },

  componentWillMount: function() {
    UserStore.on("change", this._onUserStoreChange);
  },

  showMenu: function() {
    this.refs.menu.show();
  },

  showDeeperMenu: function() {
    this.refs.deeperMenu.show();
  },

  render: function() {
    var that = this;
    var loginButtons = [
      <MenuItem key={1} onClick={this._facebookLogin}>FacebookLogin</MenuItem>,
      <MenuItem key={2} onClick={this._login}>Login</MenuItem>
    ];
    var logoutButton =  <MenuItem onClick={this._logout}>Logout</MenuItem>
    var button = this.state.currentUser ? logoutButton : loginButtons;

    return (
      <div style={height}>
        <div style={zindex}>
          <div style={contentStyle} onClick={this.showMenu}>
            <i className="fa fa-bars fa-3x"></i>
          </div>

          <Menu ref="menu" alignment="left" type="main-menu">
            {button}
            <MenuItem onClick={this.showDeeperMenu}>Deeper Menu</MenuItem>
          </Menu>

          <Menu ref="deeperMenu" alignment="left" type="deeper-menu">
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </Menu>

          <Deck />
        </div>
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

  _onUserStoreChange: function() {
    this.setState(this._getData());
  }
});

module.exports = Repiws;
