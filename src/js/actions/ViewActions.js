
"use strict";

var Dispatcher = require("./../dispatcher/Dispatcher");

var UserActions = function() {}

var publicMethods = function() {
  this.back = function(view) {
    Dispatcher.dispatch({
      type: "view-back",
      data: view
    });
  };

  this.showRegister = function() {
    Dispatcher.dispatch({
      type: "view-show-register"
    });
  };

  this.showItem = function(item) {
    Dispatcher.dispatch({
      type: "view-show-item",
      data: item
    });
  };

  this.showItems = function() {
    Dispatcher.dispatch({
      type: "view-show-items"
    });
  };

  this.setMenu = function(isActive) {
    Dispatcher.dispatch({
      type: "view-set-menu",
      data: isActive
    });
  };

  this.showLikes = function() {
    Dispatcher.dispatch({
      type: "view-show-likes"
    });
  };
}

publicMethods.call(UserActions.prototype);

module.exports = new UserActions();
