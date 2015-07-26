"use strict";

var asEvented = require("asEvented");

var Dispatcher = require("./../dispatcher/Dispatcher");

// TODO: Outsource possible views: Login, Items, ItemShow

var ViewStore = function() {
  this._currentView = {
      view: "Login"
  };

  this._isMenuActive = false;
}

var publicMethods = function() {
  this.emitChange = function() {
    this.trigger("change");
  };

  this.get = function() {
    return this._currentView;
  };

  this.getMenu = function() {
    return this._isMenuActive;
  };

  this.set = function(view, data) {
    this._currentView = {
      view: view,
      data: data
    };
  };

  this.setMenu = function(isActive) {
    this._isMenuActive = isActive;
  }
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

    case "view-show-items":
      ViewStore.set("Items");
      ViewStore.emitChange();
      break;

    case "view-show-likes":
      ViewStore.set("Likes");
      ViewStore.emitChange();
      break;

    case "view-set-menu":
      ViewStore.setMenu(action.data);
      ViewStore.emitChange();
      break;

    case "user-loggedIn":
      ViewStore.set("Items");
      ViewStore.emitChange();
      break;

    case "user-loggedOut":
      ViewStore.set("Login");
      ViewStore.setMenu(false);
      ViewStore.emitChange();
      break;
  }
});

module.exports = ViewStore;
