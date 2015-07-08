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


/*
 * Example url for quering 50 hotels from Amsterdam
 *
   http://api.ean.com/ean-services/rs/hotel/v3/list?
   cid=55505
   &minorRev=28
   &apiKey=cbrzfta369qwyrm9t5b8y8kf
   &locale=en_US
   &currencyCode=EUR
   &customerIpAddress=10.187.20.19
   &customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&   
   customerSessionId=
   &xml=<HotelListRequest>
   <RoomGroup>
   <Room>
   <numberOfAdults>2</numberOfAdults>
   </Room>
   </RoomGroup>
   <destinationString>Amsterdam</destinationString>
   <numberOfResults>50</numberOfResults>
   <minStarRating>3</minStarRating>
   <maxStarRating>5</maxStarRating>
   <propertyCategory>1</propertyCategory>
   </HotelListRequest>
*/

/*
 * Example for quering the room images
 *
  http://api.ean.com/ean-services/rs/hotel/v3/roomImages?minorRev=28
  &cid=55505
  &apiKey=cbrzfta369qwyrm9t5b8y8kf
  &customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&
  &customerIpAddress=10.187.20.19
  &customerSessionId=
  &xml=
  <HotelRoomImageRequest>
     <hotelId>373338</hotelId>
  </HotelRoomImageRequest>
*/

/*
   http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=28&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=EUR&customerIpAddress=10.187.20.19&customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&customerSessionId=&xml=<HotelListRequest><RoomGroup><Room><numberOfAdults>0</numberOfAdults></Room></RoomGroup><destinationString>Amsterdam</destinationString><numberOfResults>20</numberOfResults><minStarRating>3</minStarRating><maxStarRating>5</maxStarRating><propertyCategory>1</propertyCategory></HotelListRequest>
   
   http://api.ean.com/ean-services/rs/hotel/v3/roomImages?minorRev=28&cid=55505&apiKey=cbrzfta369qwyrm9t5b8y8kf&customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&&customerIpAddress=10.187.20.19&customerSessionId=&xml=<HotelRoomImageRequest><hotelId>113647</hotelId></HotelRoomImageRequest>
*/

// load 50 hotels from one random city 

var cities = [
  "Mexico City",
  "Tianjin",
  "Lahore",
  "Beijing",
  "Seoul",
  "Suzhou",
  "Mumbai",
  "Abidjan",
  "Yokohama",
  "Addis Ababa",
  "Kolkata",
  "Istanbul",
  "Johannesburg",
  "Jaipur",
  "Dongguan",
  "Kinshasa",
  "Singapore",
  "Bogota",
  "Shenzhen",
  "Sao Paulo",
  "Ahmedabad",
  "Delhi",
  "Cape Town",
  "Moscow",
  "Riyadh",
  "London",
  "Hyderabad",
  "Cairo",
  "Shanghai",
  "Lima",
  "Nairobi",
  "Berlin",
  "Ho Chi Minh City",
  "Tokyo",
  "Surat",
  "New Taipei City",
  "Hanoi",
  "Baghdad",
  "Lagos",
  "Chennai",
  "Bangalore",
  "Guangzhou",
  "Bangkok",
  "Tehran",
  "Pyongyang",
  "Yangon",
  "Saint Petersburg",
  "Jeddah",
  "Busan",
  "Hong Kong"
];

var HotelObject = Parse.Object.extend("Hotel");

var saveEntry = function(imageData, hotelObject, images, imageIndex, entriesUpdated, hotelData, randomCity, entriesCreated, saveSuccess) {
  var query = new Parse.Query(HotelObject);
  query.equalTo("hotelid", hotelObject.hotelid);
  query.equalTo("roomTypeCode", images[imageIndex].roomTypeCode);
  query.limit(1);
  return query.find().then(function(results) {
    if (results.length > 0) {
      results[0].set("city", randomCity);
      results[0].set("name", hotelData.name);
      results[0].set("locationDescription", hotelData.locationDescription);
      results[0].set("shortDescription", hotelData.shortDescription);
      results[0].set("deepLink", hotelData.deepLink);
      results[0].set("roomImageUrl", imageData.url);
      return results[0].save().then(function() { ++entriesUpdated; }, function(error) { console.log(error); } );
    } else {
      hotelObject.set("roomTypeCode", imageData.roomTypeCode);
      hotelObject.set("roomImageUrl", imageData.url);
      return hotelObject.save().then(function() { ++entriesCreated; }, function(error) { console.log(error); } );
    }
  });
};

var queryRoomImages = function(response, hotelObject, entriesUpdated, hotelData, randomCity, entriesCreated, saveSuccess, roomImageUrl) {
  var text = JSON.parse(response.text);
  var queryPromises = [];
  if(text.HotelRoomImageResponse.RoomImages) {
    var images = text.HotelRoomImageResponse.RoomImages.RoomImage;
    //images.length && console.log(images.length);
    for(var j = 0; j < images.length; ++j) {
      var promise = saveEntry(images[j], hotelObject, images, j, entriesUpdated, hotelData, randomCity, entriesCreated, saveSuccess);
      queryPromises.push(promise);
    }
  } else {
    console.log("No image entries for hotel id: " + hotelData.hotelId);
    console.log("Room image url: " + roomImageUrl);
  }
  return Parse.Promise.when(queryPromises);
};

var storeHotelInfo = function(hotelData, promises, entriesUpdated, randomCity, entriesCreated, saveSuccess) {
  var hotelObject = new HotelObject();
  hotelObject.set("hotelid", hotelData.hotelId);
  hotelObject.set("city", randomCity);
  hotelObject.set("name", hotelData.name);
  hotelObject.set("locationDescription", hotelData.locationDescription);
  hotelObject.set("shortDescription", hotelData.shortDescription);
  hotelObject.set("deepLink", hotelData.deepLink);
  var roomImageUrl = "http://api.ean.com/ean-services/rs/hotel/v3/roomImages?minorRev=28&cid=55505&apiKey=cbrzfta369qwyrm9t5b8y8kf&customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&&customerIpAddress=10.187.20.19&customerSessionId=&xml=<HotelRoomImageRequest><hotelId>" + hotelData.hotelId + "</hotelId></HotelRoomImageRequest>";
  return Parse.Cloud.httpRequest({
    url: roomImageUrl
  }).then(function(response) {
    return queryRoomImages(response, hotelObject, entriesUpdated, hotelData, randomCity, entriesCreated, saveSuccess, roomImageUrl);
  });
};

Parse.Cloud.job("SyncHotelData", function(request, status) {
  var entriesCreated = 0;
  var entriesUpdated = 0;
  var saveSuccess = 0;
  var saveFailed  = 0;
  var randomCityIndex = Math.floor(Math.random()*cities.length);
  var randomCity = cities[randomCityIndex];
  var queryUrl = "http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=28&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=EUR&customerIpAddress=10.187.20.19&customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&customerSessionId=&xml=<HotelListRequest><RoomGroup><Room><numberOfAdults>0</numberOfAdults></Room></RoomGroup><destinationString>" + randomCity + "</destinationString><numberOfResults>20</numberOfResults><minStarRating>3</minStarRating><maxStarRating>5</maxStarRating><propertyCategory>1</propertyCategory></HotelListRequest>";
  Parse.Cloud.httpRequest({
    url: queryUrl
  }).then(function(response) {
    var promises = [];
    var text = JSON.parse(response.text);
    if(text.HotelListResponse.HotelList) {
      var hotels = text.HotelListResponse.HotelList.HotelSummary;
      console.log("hotels length: " + hotels.length);
      var maxLength = Math.min(hotels.length, 10);
      for(var i = 0; i < maxLength; i++){
        promises.push(storeHotelInfo(hotels[i], promises, entriesUpdated, randomCity, entriesCreated, saveSuccess));
      }
    } else {
      cities.splice(randomCityIndex, 1);
      console.log("No entries returned for city: " + randomCity);
      console.log("query url: " + queryUrl);
    }
    return Parse.Promise.when(promises);
  }, function(error) {
    status.error("error getting http response from: " + queryUrl);
  }).then(function() {
    console.log("successfull saved " + saveSuccess + " entries and " + saveFailed + " failed save attempts");
    status.success("created " + entriesCreated + " and updated " + entriesUpdated + " entries");
  });
});