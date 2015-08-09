"use strict";

var RSVP = require("rsvp");
var parse = require("parse").Parse;
var asEvented = require("asEvented");
var ENV = require("../../../.env.json");

var LIKE_RELATION = "likes" + ENV.OBJECT_ITEM_NAME;
var DISLIKE_RELATION = "dislikes" + ENV.OBJECT_ITEM_NAME;

class ParseUserUtils {
  constructor() {
    this._parse = parse;
  };

  initialize() {
    var currentUser = this._parse.User.current();
    if (currentUser) {
      this.trigger("loggedIn", currentUser);
    }
  };

  current () {
    return this._parse.User.current();
  }

  register(userData) {
    var user = new this._parse.User();
    user.set("username", userData.userName);
    user.set("password", userData.password);

    var that = this;
    return new RSVP.Promise((resolve, reject) => {
      user.signUp(null, {
        success: resolve,
        error: reject
      }).then((user) => {
        that.trigger("registered", user);
      });
    });
  };

  logIn(userData) {
    var that = this;
    return new RSVP.Promise((resolve, reject) => {
      that._parse.User.logIn(userData.userName, userData.password, {
        success: resolve,
        error: reject
      }).then((user) => {
        that.trigger("loggedIn", user);
      });
    });
  };

  facebookLogIn() {
    var that = this;
    return new RSVP.Promise((resolve, reject) => {
      that._parse.FacebookUtils.logIn(null, {
        success: resolve,
        error: reject
      });
    }).then((user) => {
      that.trigger("loggedIn", user);
    });
  };

  logOut() {
    var that = this;
    return new RSVP.Promise((resolve, reject) => {
      that._parse.User.logOut();
      resolve();
    }).then(() => {
      that.trigger("loggedOut");
    });
  };

  getLikes() {
    var that = this;
    return this._getRelation(LIKE_RELATION)
      .then((likes) => {
        that.trigger("likes", likes);
        return likes;
      });
  };

  getDislikes() {
    var that = this;
    return this._getRelation(DISLIKE_RELATION)
      .then((dislikes) => {
        that.trigger("dislikes", dislikes);
        return dislikes;
      });
  };

  like(item) {
    return this._setRelation(LIKE_RELATION, item);
  };

  dislike(item) {
    return this._setRelation(DISLIKE_RELATION, item);
  };

  saveData(data) {
    var currentUser = this.current();
    var that = this;
    for (var key in data) {
      currentUser.set(key, data[key]);
    }

    return new RSVP.Promise(function(resolve, reject) {
      currentUser.save({
        success: resolve,
        error: reject
      }).then(() => {
        that.trigger("userDataSaved");
      });
    });
  }

  // PRIVATE

  _setRelation(relationName, item) {
    var user = this._parse.User.current();
    var relation = user.relation(relationName);
    relation.add(item);
    return user.save();
  };

  _getRelation(relationName) {
    var user = this._parse.User.current();
    var relation = user.relation(relationName);
    return new RSVP.Promise((resolve, reject) => {
      relation.query().limit(1000).find({
        success: resolve,
        error: reject
      });
    });
  };
}

asEvented.call(ParseUserUtils.prototype);

module.exports = new ParseUserUtils();
