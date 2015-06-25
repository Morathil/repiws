"use strict";

var asEvented = require("asEvented");

var Dispatcher = require("./../dispatcher/Dispatcher");
var ParseObjectUtils = require("./../utils/ParseObjectUtils");
var ParseUserUtils = require("./../utils/ParseUserUtils");


var ItemStore = function() {
  this._likes = [];
  this._dislikes = [];
  this._items = [];
}

var publicMethods = function() {
  this.emitChange = function() {
    this.trigger("change");
  };

  this.set = function(items) {
    this._items = items;
  };

  this.get = function() {
    var likeIds = this._likes.map(function(like) {
      return like.id
    });

    var dislikeIds = this._dislikes.map(function(dislike) {
      return dislike.id
    });

    return this._items.filter(function(item) {
      return (likeIds.indexOf(item.id) === -1 || dislikeIds.indexOf(item.id) === -1)
    });
  };

  this.setLikes = function(likes) {
    this._likes = likes;
  };

  this.setDislikes = function(dislikes) {
    this._dislikes = dislikes;
  };

  this.getLikes = function() {
    return this._likes;
  };

  this.like = function(item) {
    ParseUserUtils.like(item);
    ParseUserUtils.getLikes();
  };

  this.dislike = function(item) {
    ParseUserUtils.getDislikes();
    ParseUserUtils.dislike(item);
  };

  this.fetch = function() {
    ParseUserUtils.getLikes();
    ParseUserUtils.getDislikes();
    ParseObjectUtils.getAll();
  };
}

var privateMethods = function() {}

privateMethods.call(ItemStore.prototype);
publicMethods.call(ItemStore.prototype);
asEvented.call(ItemStore.prototype);

var ItemStore = new ItemStore();

ItemStore.dispatchToken = Dispatcher.register(function(action) {
  console.log("ItemStore:" + action.type);
  switch (action.type) {
    case "item-data":
      ItemStore.set(action.data);
      ItemStore.emitChange();
      break;

    case "item-likes":
      ItemStore.setLikes(action.data);
      ItemStore.emitChange();
      break;

    case "item-dislikes":
      ItemStore.setDislikes(action.data);
      ItemStore.emitChange();
      break;

    case "item-like":
      ItemStore.like(action.data);
      break;

    case "item-dislike":
      ItemStore.dislike(action.data);
      break;

    case "user-loggedIn":
      ItemStore.fetch();
      break;    
  }
});

module.exports = ItemStore;