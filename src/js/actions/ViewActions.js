
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
}

publicMethods.call(UserActions.prototype);

module.exports = new UserActions();
