'use strict';

var React = require("react");

var ViewActions = require("../actions/ViewActions");
var ENV = require("../../../.env.json");

var BurgerMenu = require("./BurgerMenu.jsx");

var fullscreen = {
  width: "100%",
  height: "100%"
};

var Iframe = React.createClass({

  propTypes: {
    src: React.PropTypes.string.isRequired,
    onLoad: React.PropTypes.func
  },

  componentDidMount: function() {
    this.refs.iframe.getDOMNode().addEventListener('load', this.props.onLoad);
  },

  render: function() {
    return <iframe ref="iframe" {...this.props}/>;
  }
});

var ItemShow = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div style={fullscreen}>
        <BurgerMenu style="back" />
        ITEM SHOW:
        {this.props.item.get(ENV.IMAGE_URL)}
        <Iframe style={fullscreen} className={"deepLinkIFrame"} src={this.props.item.get("deepLink")}/>
      </div>
    );
  }
});

module.exports = ItemShow;
