var xmlreader = require('cloud/xmlreader.js');

Parse.Cloud.job("syncCatApi", function(request, status) {
  Parse.Cloud.httpRequest({
    url: "http://thecatapi.com/api/images/get?format=xml&results_per_page=20"
  }).then(function(response) {
    var promises = [];

    xmlreader.read(response.text, function (err, xmldata) {
      var ItemObject = Parse.Object.extend("Item");
      var item;
      for(var i = 0; i < xmldata.response.data.images.image.count(); i++){
        var imageUrl =  xmldata.response.data.images.image.at(i).url.text();
        item = new ItemObject();
        item.set("imageUrl", imageUrl);
        promises.push(item.save());
      }
    });
    return Parse.Promise.when(promises);
  }, function(error) {
    status.error("error");
  }).then(function() {
    status.success("created cat pics");
  });
});
