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
   http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=28&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=EUR&customerIpAddress=10.187.20.19&customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&   customerSessionId=&xml=<HotelListRequest>
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
   
   http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=28&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=EUR&customerIpAddress=10.187.20.19&customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&customerSessionId=&xml=<HotelListRequest><RoomGroup><Room><numberOfAdults>0</numberOfAdults></Room></RoomGroup><destinationString>Amsterdam</destinationString><numberOfResults>20</numberOfResults><minStarRating>3</minStarRating><maxStarRating>5</maxStarRating><propertyCategory>1</propertyCategory></HotelListRequest>
   
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

Parse.Cloud.job("SyncHotelData", function(request, status) {
  var randomCity = cities[Math.floor(Math.random()*cities.length)];
  var queryUrl = "http://api.ean.com/ean-services/rs/hotel/v3/list?cid=55505&minorRev=28&apiKey=cbrzfta369qwyrm9t5b8y8kf&locale=en_US&currencyCode=EUR&customerIpAddress=10.187.20.19&customerUserAgent=Mozilla/5.0+(Windows+NT+10.0;+WOW64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/43.0.2357.130+Safari/537.36&customerSessionId=&xml=<HotelListRequest><RoomGroup><Room><numberOfAdults>0</numberOfAdults></Room></RoomGroup><destinationString>" + randomCity + "</destinationString><numberOfResults>20</numberOfResults><minStarRating>3</minStarRating><maxStarRating>5</maxStarRating><propertyCategory>1</propertyCategory></HotelListRequest>";
  Parse.Cloud.httpRequest({
    url: queryUrl
  }).then(function(response) {
    var promises = [];
    var text = JSON.parse(response.text);
    var hotels = text.HotelListResponse.HotelList.HotelSummary;

    var HotelObject = Parse.Object.extend("Hotel");
    var hotel;
    for(var i = 0; i < hotels.length; i++){
      var hotelData =  hotels[i];

      var hotelObject = new HotelObject();
      hotelObject.set("hotelid", hotelData.hotelId);
      hotelObject.set("city", randomCity);
      hotelObject.set("name", hotelData.name);
      hotelObject.set("locationDescription", hotelData.locationDescription);
      hotelObject.set("shortDescription", hotelData.shortDescription);
      hotelObject.set("deepLink", hotelData.deepLink);
      
      promises.push(hotelObject.save());
    }
    return Parse.Promise.when(promises);
  }, function(error) {
    status.error("error");
  }).then(function() {
    status.success("synced 50 more hotels");
  });
});