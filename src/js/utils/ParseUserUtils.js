"use strict";

var RSVP = require("rsvp");
var parse = require("parse").Parse;

var ParseUserUtils = function() {
  this._parse = parse;
}

var publicMethods = function() {
  this.signUp = function(userData) {
    var user = new this._parse.User();
    user.set("username", userData.userName);
    user.set("password", userData.password);
    user.set("email", userData.email);

    return new RSVP.Promise(function(resolve, reject) {
      user.signUp(null, {
        success: resolve,
        error: reject
      });
    });
  };

  this.logIn = function(userData) {
    var that = this;
    return new RSVP.Promise(function(resolve, reject) {
      that._parse.User.logIn(userData.userName, userData.password, {
        success: resolve,
        error: reject
      });
    });
  };

  this.logOut = function() {
    this._parse.User.logOut();
  };

  this.getLikes = function() {
    return this._getRelation("likes");
  };

  this.getDislikes = function() {
    return this._getRelation("dislikes");
  };

  this.likes = function(item) {
    this._setRelation("likes", item);
  };

  this.dislikes = function(item) {
    this._setRelation("dislikes", item);
  };  
}

var privateMethods = function() {
  this._setRelation = function(relationName, item) {
    var relation = this._createRelation(relationName);
    relation.add(item);
    user.save();
  };

  this._getRelation = function(relationName) {
    var relation = this._createRelation(relationName);
    return new RSVP.Promise(function() {
      relation.query().find({
        success: resolve,
        error: reject
      });
    });
  };

  this.createRelation = function(relationName) {
    var user = this._parse.User.current();
    return user.relation(relationName);    
  };
}

privateMethods.call(ParseUserUtils.prototype);
publicMethods.call(ParseUserUtils.prototype);

module.exports = new ParseUserUtils();