var Parse = require("parse").Parse;

module.exports = window.fbAsyncInit = function() {
  Parse.FacebookUtils.init({
    appId      : '499457133534807',
    cookie     : true,  // enable cookies to allow Parse to access the session
    xfbml      : true,
    version    : 'v2.3'
  });
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
