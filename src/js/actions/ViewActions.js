
"use strict";

var Dispatcher = require("./../dispatcher/Dispatcher");

class UserActions {
  back(view) {
    Dispatcher.dispatch({
      type: "view-back",
      data: view
    });
  };

  showRegister() {
    Dispatcher.dispatch({
      type: "view-show-register"
    });
  };

  showItem(item) {
    Dispatcher.dispatch({
      type: "view-show-item",
      data: item
    });
  };

  showItems() {
    Dispatcher.dispatch({
      type: "view-show-items"
    });
  };

  setMenu(isActive) {
    Dispatcher.dispatch({
      type: "view-set-menu",
      data: isActive
    });
  };

  showLikes() {
    Dispatcher.dispatch({
      type: "view-show-likes"
    });
  };

  showUserDataForm() {
    Dispatcher.dispatch({
      type: "view-show-userDataForm"
    });
  };
}

module.exports = new UserActions();
