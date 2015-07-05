"use strict";

var RSVP = require("rsvp");
var parse = require("parse").Parse;
var asEvented = require("asEvented");
var ENV = require("../../../.env.json");

var LIKE_RELATION = "likes" + ENV.OBJECT_ITEM_NAME;
var DISLIKE_RELATION = "dislikes" + ENV.OBJECT_ITEM_NAME;

var ParseUserUtils = function() {
  this._parse = parse;
}

var publicMethods = function() {
  this.initialize = function() {
    var currentUser = this._parse.User.current();
    if (currentUser) {
      this.trigger("loggedIn", currentUser);
    }
  };

  this.current = function () {
    return this._parse.User.current();
  }

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
      }).then(function(user) {
        that.trigger("loggedIn", user);
      });
    });
  };

  this.facebookLogIn = function() {
    var that = this;
    return new RSVP.Promise(function(resolve, reject) {
      that._parse.FacebookUtils.logIn(null, {
        success: resolve,
        error: reject
      });
    }).then(function(user) {
      that.trigger("loggedIn", user);
    });
  };

  this.logOut = function() {
    var that = this;
    return new RSVP.Promise(function(resolve, reject) {
      that._parse.User.logOut();
      resolve();
    }).then(function() {
      that.trigger("loggedOut");
    });
  };

  this.getLikes = function() {
    var that = this;
    return this._getRelation(LIKE_RELATION)
      .then(function(likes) {
        that.trigger("likes", likes);
        return likes;
      });
  };

  this.getDislikes = function() {
    var that = this;
    return this._getRelation(DISLIKE_RELATION)
      .then(function(dislikes) {
        that.trigger("dislikes", dislikes);
        return dislikes;
      });
  };

  this.like = function(item) {
    return this._setRelation(LIKE_RELATION, item);
  };

  this.dislike = function(item) {
    return this._setRelation(DISLIKE_RELATION, item);
  };
}

var privateMethods = function() {
  this._setRelation = function(relationName, item) {
    var user = this._parse.User.current();
    var relation = user.relation(relationName);
    relation.add(item);
    return user.save();
  };

  this._getRelation = function(relationName) {
    var user = this._parse.User.current();
    var relation = user.relation(relationName);
    return new RSVP.Promise(function(resolve, reject) {
      relation.query().limit(1000).find({
        success: resolve,
        error: reject
      });
    });
  };
}

privateMethods.call(ParseUserUtils.prototype);
publicMethods.call(ParseUserUtils.prototype);
asEvented.call(ParseUserUtils.prototype);

module.exports = new ParseUserUtils();
