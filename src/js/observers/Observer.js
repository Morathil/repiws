"use strict";

var asEvented = require("asEvented");

var ItemActions = require("./../actions/ItemActions");

var ParseObjectUtils = require("./../utils/ParseObjectUtils");

var Observer = function() {
  this._initListeners();
}

var publicMethods = function() {

}

var privateMethods = function() {
  this._initListeners = function() {
    ParseObjectUtils.on("data", ItemActions.data)
  };
} 

privateMethods.call(Observer.prototype);
publicMethods.call(Observer.prototype);
asEvented.call(Observer.prototype);

module.exports = new Observer();