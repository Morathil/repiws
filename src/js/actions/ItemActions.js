
"use strict";

var Dispatcher = require("./../dispatcher/Dispatcher");

var ItemActions = function() {

}

var publicMethods = function() {
  this.data = function(data) {
    Dispatcher.dispatch({
      type: "data",
      data: data
    });
  },

  this.like = function() {
    Dispatcher.dispatch({
      type: "like"
    });
  },

  this.dislike = function() {
    Dispatcher.dispatch({
      type: "dislike"
    });
  }  
}

publicMethods.call(ItemActions.prototype);

module.exports = new ItemActions();