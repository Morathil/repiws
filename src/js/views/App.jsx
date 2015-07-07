"use strict"

var React = require("react");

var Menu = require("./Menu.jsx");
var Deck = require("./Deck.jsx");

var Repiws = React.createClass({
  getInitialState: function() {
    return {
      isMenuActive: false
    };
  },

  showMenu: function() {
    this.setState({
      isMenuActive: true
    });
  },

  hideMenu: function() {
    this.setState({
      isMenuActive: false
    });
  },

  render: function() {
    var that = this;

    var burgerMenuActiveCss = this.state.isMenuActive ? "is-active" : "";
    var scaleContentWhileMenuActiveCss = this.state.isMenuActive ? "active-menu" : "";
    var clickAction = this.state.isMenuActive ? this.hideMenu : this.showMenu;

    return (
      <div>
        <div className={"content " + scaleContentWhileMenuActiveCss}>
          <button onClick={clickAction} className={"burger-menu c-hamburger c-hamburger--htx " + burgerMenuActiveCss}>
            <span>toggle menu</span>
          </button>
          <Deck />
        </div>
        <Menu />
      </div>
    );
  }
});

module.exports = Repiws;
