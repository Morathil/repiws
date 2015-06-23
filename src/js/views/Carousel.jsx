var React = require("react");
var ReactSwipe = require("../components/react-swipe.js");

var Carousel = React.createClass({
  getInitialState: function() {
    return this._getData()
  },

  componentWillMount: function() {
    ItemStore.on("change", this._onItemStoreChange);
  },

  render: function() {
    var that = this;

    if (this.state.items.length === 0) {
      return null;
    }

    return (
      <ReactSwipe id="swipe" continuous={true}>
        {
          this.state.items.map(function(item, index) {
            var backgroundImage = {
              backgroundImage: "url(" + item.get("imageUrl") + ")"
            };

            return <div className="offer" onClick={that._like.bind(null, item)} style={backgroundImage} key={item.id}></div>
          })
        }      
      </ReactSwipe>
    );
  },

  _like: function(item) {
    ItemActions.like(item);
  },

  _onItemStoreChange: function() {
    this.setState(this._getData());
  },

  _getData: function() {
    return {
      items: ItemStore.get() || []
    };
  }    
});

module.exports = Carousel;