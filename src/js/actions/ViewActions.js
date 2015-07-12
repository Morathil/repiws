
"use strict";

var Dispatcher = require("./../dispatcher/Dispatcher");

var UserActions = function() {}

var publicMethods = function() {
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
}

publicMethods.call(UserActions.prototype);

module.exports = new UserActions();
