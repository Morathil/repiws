"use strict"

var React = require("react");
var Carousel = require("./Carousel.jsx");
var Example = require("./Example.jsx");

var height = {
  height: "100%"
};

var Repiws = React.createClass({
  render: function() {
    return (
      <div style={height}>
        <Example />
        <Carousel />
      </div>
    );
  }
});

module.exports = Repiws;