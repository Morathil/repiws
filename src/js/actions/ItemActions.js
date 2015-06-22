
"use strict";

var Dispatcher = require("./../dispatcher/Dispatcher");

var ItemActions = function() {

}

var publicMethods = function() {
  this.data = function(items) {
    Dispatcher.dispatch({
      type: "data",
      data: items
    });
  },

  this.likes = function(likes) {
    Dispatcher.dispatch({
      type: "likes",
      data: likes 
    });
  },

  this.like = function(item) {
    Dispatcher.dispatch({
      type: "like",
      data: item 
    });
  },

  this.dislike = function(item) {
    Dispatcher.dispatch({
      type: "dislike",
      data: item
    });
  }  
}

publicMethods.call(ItemActions.prototype);

module.exports = new ItemActions();