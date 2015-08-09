
"use strict";

var Dispatcher = require("./../dispatcher/Dispatcher");

class UserActions {
  register(registerData) {
    Dispatcher.dispatch({
      type: "user-register",
      data: registerData
    });
  };

  login(loginData) {
    Dispatcher.dispatch({
      type: "user-login",
      data: loginData
    });
  };

  facebookLogin() {
    Dispatcher.dispatch({
      type: "user-facebookLogin"
    });
  };

  logout() {
    Dispatcher.dispatch({
      type: "user-logout"
    });
  };

  registered(user) {
    Dispatcher.dispatch({
      type: "user-registered",
      data: user
    });
  };

  loggedIn(user) {
    Dispatcher.dispatch({
      type: "user-loggedIn",
      data: user
    });
  };

  loggedOut() {
    Dispatcher.dispatch({
      type: "user-loggedOut"
    });
  };

  loggedOut() {
    Dispatcher.dispatch({
      type: "user-loggedOut"
    });
  };

  saveUserData(userData) {
    Dispatcher.dispatch({
      type: "user-data-save",
      data: userData
    });
  };

  savedUserData() {
    Dispatcher.dispatch({
      type: "user-data-saved"
    });
  };
}

module.exports = new UserActions();
