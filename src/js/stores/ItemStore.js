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

  this.getData = function(data) {

  };

  this.setData = function(data) {
    console.log("setData");
    console.log(data);
  };

  this.like = function() {

  };

  this.dislike = function() {

  };
}

var privateMethods = function() {
  this._fetch = function() {
    ParseObjectUtils.getAll();
  };
}

privateMethods.call(ItemStore.prototype);
publicMethods.call(ItemStore.prototype);
asEvented.call(ItemStore.prototype);

var ItemStore = new ItemStore();

ItemStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case "data":
      ItemStore.setData(action.data);
      ItemStore.emitChange();
      break;

    case "like":
      ItemStore.like();
      ItemStore.emitChange();
      break;

    case "dislike":
      ItemStore.disklike();
      ItemStore.emitChange();
      break;
  }
});

module.exports = ItemStore;