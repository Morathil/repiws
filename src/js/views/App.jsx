"use strict"

var React = require("react");

var Menu = require("./Menu.jsx");
var Items = require("./Items.jsx");
var ItemShow = require("./ItemShow.jsx");
var Login = require("./Login.jsx");

var ViewActions = require("../actions/ViewActions");
var ViewStore = require("../stores/ViewStore");
var UserStore = require("../stores/UserStore");

var VIEWS = {
  Login: Login,
  Items: Items,
  ItemShow: ItemShow
}

var Repiws = React.createClass({
  getInitialState: function() {
    return {
      isMenuActive: false,
      view: ViewStore.get(),
      currentUser: UserStore.get()
    };
  },

  componentWillMount: function() {
    ViewStore.on("change", this._onViewStoreChange);
    UserStore.on("change", this._onUserStoreChange);
  },

  render: function() {
    var that = this;

    var Content = VIEWS[this.state.view];
    var burgerMenu = this.state.currentUser ? this._renderBurgerMenu() : null;
    var scaleContentWhileMenuActiveCss = this.state.isMenuActive ? "active-menu" : "";


    return (
      <div>
        {burgerMenu}
        <div className={"content " + scaleContentWhileMenuActiveCss}>
          <Content />
        </div>
      </div>
    );
  },

  _renderBurgerMenu: function() {
    var clickAction = this.state.isMenuActive ? this._hideMenu : this._showMenu;
    var burgerMenuActiveCss = this.state.isMenuActive ? "is-active" : "";

    return (
      <div>
        <button onClick={clickAction} className={"burger-menu c-hamburger c-hamburger--htx " + burgerMenuActiveCss}>
          <span>toggle menu</span>
        </button>
        <Menu />
      </div>
    );
  },

  _showMenu: function() {
    this.setState({
      isMenuActive: true
    });
  },

  _hideMenu: function() {
    this.setState({
      isMenuActive: false
    });
  },

  _onViewStoreChange: function() {
    this.setState({
      view: ViewStore.get()
    });
  },

  _onUserStoreChange: function() {
    this.setState({
      currentUser: UserStore.get(),
      isMenuActive: false
    });
  }
});

module.exports = Repiws;
