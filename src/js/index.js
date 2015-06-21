var React = require("react");
var App = require("./views/App.jsx");
var ENV = require("../../.env.json");

var Parse = require("parse").Parse;
Parse.initialize(ENV.PARSE_APP_ID, ENV.PARSE_JAVASCRIPT_KEY);

var Observer = require("./observers/Observer");

// TODO: Remove when not needed anymore
var ParseUserUtils = require("./utils/ParseUserUtils");
var ParseObjectUtils = require("./utils/ParseObjectUtils");
window.parseUserUtils = ParseUserUtils;
window.parseObjectUtils = ParseObjectUtils;
// -- end --

// TODO: Remove hard coded login
var ItemStore = require("./stores/ItemStore");

window.parseUserUtils.logIn({
	userName: "1234",
	password: "1234"
}).then(function() {
	ItemStore._fetch();
});
// -- end --

React.render( <App /> ,
  document.getElementById("content")
);