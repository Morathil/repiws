
"use strict";

var Dispatcher = require("./../dispatcher/Dispatcher");

var ItemActions = function() {}

var publicMethods = function() {
  this.data = function(items) {
    Dispatcher.dispatch({
      type: "item-data",
      data: items
    });
  },

  this.likes = function(likes) {
    Dispatcher.dispatch({
      type: "item-likes",
      data: likes
    });
  },

  this.dislikes = function(dislikes) {
    Dispatcher.dispatch({
      type: "item-dislikes",
      data: dislikes
    });
  },

  this.like = function(item) {
    Dispatcher.dispatch({
      type: "item-like",
      data: item
    });
  },

  this.dislike = function(item) {
    Dispatcher.dispatch({
      type: "item-dislike",
      data: item
    });
  },

  this.refresh = function() {
    Dispatcher.dispatch({
      type: "item-refresh"
    });
  }
}

publicMethods.call(ItemActions.prototype);

module.exports = new ItemActions();
