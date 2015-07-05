"use strict"

var React = require("react");
var MenuSet = require("./SlidingMenu.jsx");

var UserActions = require("./../actions/UserActions");
var UserStore = require("./../stores/UserStore");

var ItemActions = require("../actions/ItemActions");
var ItemStore = require("../stores/ItemStore");

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
  zIndex: 10,
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
    this.setState({
      isMenuActive: true
    });
  },

  hideMenu: function() {
    this.refs.menu.hide();
    this.setState({
      isMenuActive: false
    });
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

    var isMenuActiveCss = this.state.isMenuActive ? "is-active" : null;
    var clickAction = this.state.isMenuActive ? this.hideMenu : this.showMenu;

    return (
      <div style={height}>
        <div style={zindex}>
          <button onClick={clickAction} style={contentStyle} className={"c-hamburger c-hamburger--htx " + isMenuActiveCss}>
            <span>toggle menu</span>
          </button>

          <Menu ref="menu" alignment="left" type="main-menu">
            {button}
            <MenuItem onClick={this._refresh}>Refresh Data</MenuItem>
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

  _refresh: function() {
    ItemActions.refresh();
  },

  _onUserStoreChange: function() {
    this.setState(this._getData());
  }
});

module.exports = Repiws;
