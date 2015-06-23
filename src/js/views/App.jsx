"use strict"

var React = require("react");
var Carousel = require("./Carousel.jsx");
var MenuSet = require("./SlidingMenu.jsx");
var Menu = MenuSet.Menu;
var MenuItem = MenuSet.MenuItem;

var height = {
  height: "100%"
};

var posAbs = {
  position: "absolute"
};

var zindex = {
  zIndex: 2
}

var contentStyle = {
  zIndex: 2,
  position: "absolute"
}

var Repiws = React.createClass({
  showMenu: function() {
    this.refs.menu.show();
  },
  
  showDeeperMenu: function() {
    this.refs.deeperMenu.show();
  },

  render: function() {
    var that = this;

    return (
      <div style={height}>
        <div style={zindex}>
          <button style={contentStyle} onClick={this.showMenu}>Show Menu!</button>
          
          <Menu ref="menu" alignment="left" type="main-menu">
            <MenuItem onClick={this.showDeeperMenu}>Option 1</MenuItem>
            <MenuItem onClick={this.showDeeperMenu}>Option 2</MenuItem>
            <MenuItem onClick={this.showDeeperMenu}>Option 3</MenuItem>
          </Menu>
          
          <Menu ref="deeperMenu" alignment="left" type="deeper-menu">
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>        
          </Menu>
        </div>
        <Carousel />
      </div>
    );
  }
});

module.exports = Repiws;