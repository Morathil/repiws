"use strict";

var asEvented = require("asEvented");

var ItemActions = require("./../actions/ItemActions");
var UserActions = require("./../actions/UserActions");

var ParseObjectUtils = require("./../utils/ParseObjectUtils");
var ParseUserUtils = require("./../utils/ParseUserUtils");

var Observer = function() {
  this._initListeners();
}

var privateMethods = function() {
  this._initListeners = function() {
    ParseObjectUtils.on("data", ItemActions.data);

    ParseUserUtils.on("registered", UserActions.registered);
    ParseUserUtils.on("likes", ItemActions.likes);
    ParseUserUtils.on("dislikes", ItemActions.dislikes);
    ParseUserUtils.on("loggedIn", UserActions.loggedIn);
    ParseUserUtils.on("loggedOut", UserActions.loggedOut);
  };
}

privateMethods.call(Observer.prototype);
asEvented.call(Observer.prototype);

module.exports = new Observer();
