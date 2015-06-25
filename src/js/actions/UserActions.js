
"use strict";

var Dispatcher = require("./../dispatcher/Dispatcher");

var UserActions = function() {}

var publicMethods = function() {
  this.login = function(loginData) {
    Dispatcher.dispatch({
      type: "user-login",
      data: loginData
    });
  };

  this.facebookLogin = function() {  
    Dispatcher.dispatch({
      type: "user-facebookLogin"
    });
  };

  this.logout = function() {
    Dispatcher.dispatch({
      type: "user-logout"
    });    
  };

  this.loggedIn = function(user) {
    Dispatcher.dispatch({
      type: "user-loggedIn",
      data: user
    });        
  };

  this.loggedOut = function() {
    Dispatcher.dispatch({
      type: "user-loggedOut"
    });        
  }; 
}

publicMethods.call(UserActions.prototype);

module.exports = new UserActions();