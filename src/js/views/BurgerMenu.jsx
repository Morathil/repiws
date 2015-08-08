var React = require("react");

var ViewActions = require("../actions/ViewActions");
var ViewStore = require("../stores/ViewStore");

var UserStore = require("../stores/UserStore");

var BurgerMenu = React.createClass({
  propTypes: {
    style: React.PropTypes.string.isRequired,
    backView: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      isMenuActive: ViewStore.getMenu()
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
    console.log("RENDER");
    var clickAction = this.state.isMenuActive ? this._hideMenu : this._showMenu;
    var burgerMenuActiveCss = this.state.isMenuActive ? "is-active" : "";
    var style = "c-hamburger--htx";
    var align = "right";

    if (this.props.style === "back") {
      style = "c-hamburger--htla";
      align = "left";
      burgerMenuActiveCss = "is-active";
      clickAction = ViewActions.back.bind(this, this.props.backView);
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
