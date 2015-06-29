"use strict";

var RSVP = require("rsvp");
var parse = require("parse").Parse;
var asEvented = require("asEvented");
var ENV = require("../../../.env.json");

var ParseObjectUtils = function() {
  this._parse = parse;
  this._Item = this._parse.Object.extend(ENV.OBJECT_ITEM_NAME);
}

var publicMethods = function() {
  this.save = function(data) {
    var item = new this._Item();

    for (var key in data) {
      item.set(key, data[key]);
    }

    return new RSVP.Promise(function(resolve, reject) {
      item.save({
        success: resolve,
        error: reject
      });
    });
  };

  this.getAll = function() {
    var query = new this._parse.Query(this._Item);
    var that = this;

    return new RSVP.Promise(function(resolve, reject) {
      query.find({
        success: resolve,
        error: reject
      });
    }).then(function(data) {
      that.trigger("data", data);
    }).catch(function(error) {
      that.trigger("error", error);
    });
  };
}

var privateMethods = function() {

}

privateMethods.call(ParseObjectUtils.prototype);
publicMethods.call(ParseObjectUtils.prototype);
asEvented.call(ParseObjectUtils.prototype);

module.exports = new ParseObjectUtils();
