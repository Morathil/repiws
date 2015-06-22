"use strict";

var asEvented = require("asEvented");

var ItemActions = require("./../actions/ItemActions");
var ParseObjectUtils = require("./../utils/ParseObjectUtils");
var ParseUserUtils = require("./../utils/ParseUserUtils");

var Observer = function() {
  this._initListeners();
}

var privateMethods = function() {
  this._initListeners = function() {
    ParseObjectUtils.on("data", ItemActions.data);

    ParseUserUtils.on("likes", ItemActions.likes);
  };
} 

privateMethods.call(Observer.prototype);
asEvented.call(Observer.prototype);

module.exports = new Observer();