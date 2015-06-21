var React = require("react");
var ReactSwipe = require("react-swipe");

var link1 = {
  backgroundImage: "url('https://warpnet-media.s3.amazonaws.com/6dab2c537d3a0243f98558d3ac468e718b5ed006067a5b71798fb8b8')"
}
var link2 = {
  backgroundImage: "url('http://www.mawakebholidays.com/sites/default/files/styles/galleryformatter_slide/public/bmi_nice.jpg?itok=We4lvGuX')"
}
var link3 = {
  backgroundImage: "url('https://pbs.twimg.com/profile_images/1058163083/Nice_Things_Logo_cropped_small_400x400.jpg')"
}

var Carousel = React.createClass({
  render: function() {
    return (
      <ReactSwipe id="swipe" continuous={true}>
        <div className="offer" style={link1}></div>
        <div className="offer" style={link2}></div>
        <div className="offer" style={link3}></div>
      </ReactSwipe>
    );
  }
});

module.exports = Carousel;