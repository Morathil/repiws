"use strict";

var asEvented = require("asEvented");

var Dispatcher = require("./../dispatcher/Dispatcher");
var ParseUserUtils = require("./../utils/ParseUserUtils");


var UserStore = function() {
  this._currentUser = null;
}

var publicMethods = function() {
  this.initialize = function() {
    ParseUserUtils.initialize();
  };

  this.emitChange = function() {
    this.trigger("change");
  };

  this.get = function() {
    return this._currentUser;
  };

  this.register = function(registerData) {
    ParseUserUtils.register(registerData);
  };

  this.login = function(loginData) {
    ParseUserUtils.logIn(loginData);
  };

  this.logout = function() {
    ParseUserUtils.logOut();
  };

  this.facebookLogin = function() {
    ParseUserUtils.facebookLogIn();
  };

  this.loggedIn = function(currentUser) {
    this._currentUser = currentUser;
  };

  this.loggedOut = function() {
    this._currentUser = null;
  };
}

var privateMethods = function() {}

privateMethods.call(UserStore.prototype);
publicMethods.call(UserStore.prototype);
asEvented.call(UserStore.prototype);

var UserStore = new UserStore();

UserStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case "user-register":
      UserStore.register(action.data);
      break;

    case "user-login":
      UserStore.login(action.data);
      break;

    case "user-facebookLogin":
      UserStore.facebookLogin();
      break;

    case "user-registered":
    case "user-loggedIn":
      UserStore.loggedIn(action.data);
      UserStore.emitChange();
      break;

    case "user-logout":
      UserStore.logout();
      break;

    case "user-loggedOut":
      UserStore.loggedOut();
      UserStore.emitChange();
      break;
  }
});

module.exports = UserStore;
