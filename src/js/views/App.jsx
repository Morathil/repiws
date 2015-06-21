"use strict"

var React = require("react");
var Carousel = require("./Carousel.jsx");
var Example = require("./Example.jsx");


var Repiws = React.createClass({
  render: function() {
    return (
      <div>
        <Example />
        <Carousel />
      </div>
    );
  }
});

module.exports = Repiws;