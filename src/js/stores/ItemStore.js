"use strict";

var asEvented = require("asEvented");

var Dispatcher = require("./../dispatcher/Dispatcher");
var ParseObjectUtils = require("./../utils/ParseObjectUtils");

var ItemStore = function() {

}

var publicMethods = function() {
  this.emitChange = function() {
    this.trigger("change");
  };

  this.set = function(items) {
    this._items = items;
  };

  this.get = function() {
    return this._items;
  };

  this.setLikes = function(likes) {
    this._likes = likes;
  };

  this.getLikes = function() {
    return this._likes;
  };

  this.like = function(item) {
    ParseUserUtils.like(item);
  };

  this.dislike = function(item) {
    ParseUserUtils.dislike(item);
  };
}

var privateMethods = function() {
  this._fetch = function() {
    ParseObjectUtils.getAll();
    ParseUserUtils.getLikes();
  };
}

privateMethods.call(ItemStore.prototype);
publicMethods.call(ItemStore.prototype);
asEvented.call(ItemStore.prototype);

var ItemStore = new ItemStore();

ItemStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case "data":
      ItemStore.set(action.data);
      ItemStore.emitChange();
      break;

    case "likes":
      ItemStore.setLikes(actions.data);
      ItemStore.emitChange();
      break;

    case "like":
      ItemStore.like(actions.data);
      ItemStore.emitChange();
      break;

    case "dislike":
      ItemStore.dislike(action.data);
      ItemStore.emitChange();
      break;
  }
});

module.exports = ItemStore;