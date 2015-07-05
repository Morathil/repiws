"use strict";

var asEvented = require("asEvented");
var RSVP = require("rsvp");

var Dispatcher = require("./../dispatcher/Dispatcher");
var ParseObjectUtils = require("./../utils/ParseObjectUtils");
var ParseUserUtils = require("./../utils/ParseUserUtils");

var MAX_DECK_SIZE = 2;

var ItemStore = function() {
  this._likes = [];
  this._dislikes = [];
  this._items = [];
}

var publicMethods = function() {
  this.emitChange = function() {
    console.log("CHANGE ITEM STORE");
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

    var filteredItems = []
    for (var i = 0; i < this._items.length; i++) {
      var item = this._items[i];
      if ((likeIds.indexOf(item.id) === -1 && dislikeIds.indexOf(item.id) === -1) && filteredItems.length < MAX_DECK_SIZE) {
        filteredItems.push(item);
      }
    }

    return filteredItems.reverse();
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
    this._likes.push(item);
  };

  this.dislike = function(item) {
    ParseUserUtils.dislike(item);
    this._dislikes.push(item);
  };

  this.fetch = function() {
    var promises = [];
    promises.push(ParseUserUtils.getLikes());
    promises.push(ParseUserUtils.getDislikes());

    var that = this;
    RSVP.all(promises).then(function() {
      ParseObjectUtils.getAll(that._likes, that._dislikes);
    });
  };
}

var privateMethods = function() {
  this._isRequiredToFetchData = function () {
    return (this._items.length < MAX_DECK_SIZE);
  };
};

privateMethods.call(ItemStore.prototype);
publicMethods.call(ItemStore.prototype);
asEvented.call(ItemStore.prototype);

var ItemStore = new ItemStore();

ItemStore.dispatchToken = Dispatcher.register(function(action) {
  console.log(action.type);
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
      ItemStore.emitChange();
      break;

    case "item-refresh":
      ItemStore.fetch();
      break;

    case "item-dislike":
      ItemStore.dislike(action.data);
      ItemStore.emitChange();
      break;

    case "user-loggedIn":
      ItemStore.fetch();
      break;
  }
});

module.exports = ItemStore;
