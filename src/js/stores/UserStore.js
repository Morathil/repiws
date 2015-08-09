"use strict";

var asEvented = require("asEvented");

var Dispatcher = require("./../dispatcher/Dispatcher");
var ParseUserUtils = require("./../utils/ParseUserUtils");

class UserStore {
  constructor() {
    this._currentUser = null;
  };

  initialize() {
    ParseUserUtils.initialize();
  };

  emitChange() {
    this.trigger("change");
  };

  get() {
    return this._currentUser;
  };

  register(registerData) {
    ParseUserUtils.register(registerData);
  };

  login(loginData) {
    ParseUserUtils.logIn(loginData);
  };

  logout() {
    ParseUserUtils.logOut();
  };

  facebookLogin() {
    ParseUserUtils.facebookLogIn();
  };

  loggedIn(currentUser) {
    this._currentUser = currentUser;
  };

  loggedOut() {
    this._currentUser = null;
  };

  saveData(userData) {
    ParseUserUtils.saveData(userData);
  };
}

asEvented.call(UserStore.prototype);

var userStore = new UserStore();

userStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case "user-register":
      userStore.register(action.data);
      break;

    case "user-login":
      userStore.login(action.data);
      break;

    case "user-facebookLogin":
      userStore.facebookLogin();
      break;

    case "user-registered":
    case "user-loggedIn":
      userStore.loggedIn(action.data);
      userStore.emitChange();
      break;

    case "user-logout":
      userStore.logout();
      break;

    case "user-loggedOut":
      userStore.loggedOut();
      userStore.emitChange();
      break;

    case "user-data-save":
      userStore.saveData(action.data);
      break;

    case "user-data-saved":
      userStore.emitChange();
      break;
  }
});

module.exports = userStore;
