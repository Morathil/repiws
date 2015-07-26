"use strict"

var React = require("react");

var ItemStore = require("./../stores/ItemStore");

var Likes = React.createClass({
  getInitialState: function() {
    return {
      likes: ItemStore.getLikes()
    };
  },

  render: function() {
    var likes = this.state.likes.map(function(like, index) {
      var title = like.get("city");
      var name = like.get("name");
      var imageUrl = like.get("roomImageUrl");
      var bgi = {
        backgroundImage: "url(" + imageUrl + ")",
        backgroundSize: "cover"
      }
      return (
        <div style={bgi} className="likes-show-item" key={index}>
          <div className="likes-show-item-information">
            {title}
            <br />
              <br />

            {name}
          </div>
        </div>
      );
    });

    return (
      <div className="likes-show">
        {likes}
      </div>
    );
  }
});

module.exports = Likes;
