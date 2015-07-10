"use strict";

var asEvented = require("asEvented");

var Dispatcher = require("./../dispatcher/Dispatcher");

// TODO: Outsource possible views: Login, Items, ItemShow

var ViewStore = function() {
  this._currentView = "Login";
}

var publicMethods = function() {
  this.emitChange = function() {
    this.trigger("change");
  };

  this.get = function() {
    return this._currentView;
  };

  this.set = function(view, data) {
    this._currentView = view;
  };
}

var privateMethods = function() {}

privateMethods.call(ViewStore.prototype);
publicMethods.call(ViewStore.prototype);
asEvented.call(ViewStore.prototype);

var ViewStore = new ViewStore();

ViewStore.dispatchToken = Dispatcher.register(function(action) {
  switch (action.type) {
    case "view-show-item":
      ViewStore.set("ItemShow", action.data);
      ViewStore.emitChange();
      break;

    case "user-loggedIn":
      ViewStore.set("Items");
      ViewStore.emitChange();
      break;

    case "user-loggedOut":
      ViewStore.set("Login");
      ViewStore.emitChange();
      break;
  }
});

module.exports = ViewStore;
