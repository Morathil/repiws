var React = require("react");
var ReactSwipe = require("react-swipe");

var Carousel = React.createClass({
  render: function() {
    return (
      <ReactSwipe className="swipe" continuous={true} auto={3000}>
        <div><img src="https://warpnet-media.s3.amazonaws.com/6dab2c537d3a0243f98558d3ac468e718b5ed006067a5b71798fb8b8" /></div>
        <div><img src="http://www.mawakebholidays.com/sites/default/files/styles/galleryformatter_slide/public/bmi_nice.jpg?itok=We4lvGuX" /></div>
        <div><img src="https://pbs.twimg.com/profile_images/1058163083/Nice_Things_Logo_cropped_small_400x400.jpg" /></div>
      </ReactSwipe>
    );
  }
});

module.exports = Carousel;