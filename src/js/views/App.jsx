"use strict"

var React = require("react");
var Carousel = require("./Carousel.jsx");

var Repiws = React.createClass({
  render: function() {
    return (
    	<div>
		   <nav className="cyan darken-4">
		   <div className="container">
			    <div className="nav-wrapper">
			      <a href="#" className="brand-logo">Repiws</a>
			    </div>
		    </div>
		  </nav>    	
      <div className={""}>
      </div>
      <Carousel />
    </div>
    );
  }
});

module.exports = Repiws;