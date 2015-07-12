"use strict";

require("file?name=[path][name].[ext]&context=./src!../index.html");
require("../style/css/index.css");
require("../style/css/stack.css");
require("../style/sass/sass.scss")
require("font-awesome-webpack");

var ENV = require("../../.env.json");

// Npm requires
var React = require("react");
var RSVP = require("rsvp");
var Parse = require("parse").Parse;

// Initialize Parse SDK
Parse.initialize(ENV.PARSE_APP_ID, ENV.PARSE_JAVASCRIPT_KEY);

// Local requires
var FacebookSdk = require("./components/facebookSdk");
var App = require("./views/App.jsx");

// Log rsvp errors
RSVP.on("error", function(error) {
	console.log("RSVP ERROR:");
	console.log(error);
});

// Require all necessary js files and call if needed call their initialize method
var Observer = require("./observers/Observer");
var ItemStore = require("./stores/ItemStore");
var UserStore = require("./stores/UserStore");
var ViewStore = require("./stores/ViewStore");
UserStore.initialize();

// Initialize first root react component
React.render( <App /> ,
  document.getElementById("content")
);
