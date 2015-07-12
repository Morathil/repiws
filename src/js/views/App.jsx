"use strict"

var React = require("react");

var Menu = require("./Menu.jsx");
var Items = require("./Items.jsx");
var ItemShow = require("./ItemShow.jsx");
var Login = require("./Login.jsx");
var BurgerMenu = require("./BurgerMenu.jsx");

var ViewActions = require("../actions/ViewActions");
var ViewStore = require("../stores/ViewStore");

var VIEWS = {
  Login: Login,
  Items: Items,
  ItemShow: ItemShow
}

var Repiws = React.createClass({
  getInitialState: function() {
    return {
      view: ViewStore.get(),
      isMenuActive: ViewStore.getMenu()
    };
  },

  componentWillMount: function() {
    ViewStore.on("change", this._onViewStoreChange);
  },

  render: function() {
    var that = this;

    var Content = VIEWS[this.state.view.view];
    var scaleContentWhileMenuActiveCss = this.state.isMenuActive ? "active-menu" : "";

    return (
      <div>
        <BurgerMenu style="menu" />
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
  }
});

module.exports = Repiws;
