"use strict"

var React = require("react");
var ItemStore = require("./../stores/ItemStore");
var ItemActions = require("./../actions/ItemActions");
var Carousel = require("./Carousel.jsx");
var Example = require("./Example.jsx");
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
  getInitialState: function() {
    return this._getData()
  },

  componentWillMount: function() {
    ItemStore.on("change", this._onItemStoreChange);
  },

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
            {
              this.state.items.map(function(item, index) {
                return <MenuItem key={item.id}><div onClick={that._like.bind(null, item)}>{item.get("bla")}</div></MenuItem>
              })
            }


            {
              this.state.likes.map(function(item, index) {
                return <MenuItem key={item.id}><div>{item.get("bla")}</div></MenuItem>
              })
            }            
          </Menu>
    
          <Example />
        </div>
        <Carousel>
          
        </Carousel>
      </div>
    );
  },

  _like: function(item) {
    ItemActions.like(item);
  },

  _onItemStoreChange: function() {
    this.setState(this._getData());
  },

  _getData: function() {
    return {
      items: ItemStore.get() || [],
      likes: ItemStore.getLikes() || []
    };
  }  
});

module.exports = Repiws;