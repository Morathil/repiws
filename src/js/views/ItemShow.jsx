var React = require("react");

var ViewActions = require("../actions/ViewActions");
var ENV = require("../../../.env.json");

var BurgerMenu = require("./BurgerMenu.jsx");

var ItemShow = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div>
        <BurgerMenu style="back" />
        ITEM SHOW:
        {this.props.item.get(ENV.IMAGE_URL)}
      </div>
    );
  }
});

module.exports = ItemShow;
