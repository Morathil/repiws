var React = require("react");

var ViewActions = require("../actions/ViewActions");
var ViewStore = require("../stores/ViewStore");

var UserStore = require("../stores/UserStore");

var BurgerMenu = React.createClass({
  propTypes: {
    style: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      isMenuActive: ViewStore.getMenu(),
      currentUser: UserStore.get()
    };
  },

  componentWillMount: function() {
    ViewStore.on("change", this._onViewStoreChange);
    UserStore.on("change", this._onUserStoreChange);
  },

  componentWillUnmount: function() {
    ViewStore.off("change", this._onViewStoreChange);
    UserStore.off("change", this._onUserStoreChange);
  },

  render: function() {
    if (!this.state.currentUser) {
      return null;
    }

    var clickAction = this.state.isMenuActive ? this._hideMenu : this._showMenu;
    var burgerMenuActiveCss = this.state.isMenuActive ? "is-active" : "";
    var style = "c-hamburger--htx";
    var align = "right";

    if (this.props.style === "back") {
      style = "c-hamburger--htla";
      align = "left";
      burgerMenuActiveCss = "is-active";
      clickAction = ViewActions.showItems;
    }

    return (
      <div>
        <button onClick={clickAction} className={"burger-menu c-hamburger " + style + " burgerMenuActiveCss " + align + " " + burgerMenuActiveCss}>
          <span>toggle menu</span>
        </button>
      </div>
    );
  },

  _showMenu: function() {
    ViewActions.setMenu(true);
  },

  _hideMenu: function() {
    ViewActions.setMenu(false);
  },

  _onViewStoreChange: function() {
    this.setState({
      isMenuActive: ViewStore.getMenu()
    });
  },

  _onUserStoreChange: function() {
    this.setState({
      currentUser: UserStore.get()
    });
  }
});

module.exports = BurgerMenu;
