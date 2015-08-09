"use strict"

var React = require("react");

var Menu = require("./Menu.jsx");
var Items = require("./Items.jsx");
var ItemShow = require("./ItemShow.jsx");
var Login = require("./Login.jsx");
var BurgerMenu = require("./BurgerMenu.jsx");
var Likes = require("./Likes.jsx");
var Register = require("./Register.jsx");
import UserDataForm from "./UserDataForm.jsx";

var ViewActions = require("../actions/ViewActions");
var ViewStore = require("../stores/ViewStore");

var UserStore = require("./../stores/UserStore");

var VIEWS = {
  Login: Login,
  Register: Register,
  Items: Items,
  ItemShow: ItemShow,
  Likes: Likes,
  UserDataForm: UserDataForm
}

var Repiws = React.createClass({
  getInitialState: function() {
    return {
      view: ViewStore.get(),
      isMenuActive: ViewStore.getMenu(),
      currentUser: UserStore.get()
    };
  },

  componentWillMount: function() {
    UserStore.on("change", this._onUserStoreChange);
    ViewStore.on("change", this._onViewStoreChange);
  },

  componentWillUnmount: function() {
    UserStore.off("change", this._onUserStoreChange);
    ViewStore.off("change", this._onViewStoreChange);
  },

  render: function() {
    var that = this;

    var Content = VIEWS[this.state.view.view];
    var scaleContentWhileMenuActiveCss = this.state.isMenuActive ? "active-menu" : "";

    var menu = this.state.currentUser ? <BurgerMenu style="menu" /> : null;

    return (
      <div>
        {menu}
        <Menu />
        <div className={"content " + scaleContentWhileMenuActiveCss}>
          { React.createElement(Content, { item: this.state.view.data }) }
        </div>
      </div>
    );
  },

  _onViewStoreChange: function() {
    this.setState({
      view: ViewStore.get(),
      isMenuActive: ViewStore.getMenu()
    });
  },

  _onUserStoreChange: function() {
    this.setState({
      currentUser: UserStore.get()
    });
  }
});

module.exports = Repiws;
