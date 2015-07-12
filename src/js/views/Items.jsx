var React = require("react");
// var Swing = require("../components/swing.min");
var Swing = require("../vendor/swing/swing");

var ItemActions = require("../actions/ItemActions");
var ItemStore = require("../stores/ItemStore");

var ViewActions = require("../actions/ViewActions");

var ENV = require("../../../.env.json");

var Items = React.createClass({
  config: {
    throwOutConfidence: function (offset, element) {
      var confidence = Math.min(Math.abs(offset) / element.offsetWidth, 1);
      return confidence > 0.35 ? 1 : 0;
    },
    minThrowOutDistance: 2048,
    maxThrowOutDistance: 2048,
    maxRotation: 0
},
  cards: [],
  images: [],

  getInitialState: function() {
    return this._getData()
  },

  componentDidMount: function() {
    this.stack = gajus.Swing.Stack(this.config);
    // Prepare the cards in the stack for iteration.
    this.cards = [].slice.call(document.querySelectorAll('ul li'))

    var that = this;
    var card;
    this.cards.forEach(function (targetElement) {
        // Add card element to the Stack.
        card = that.stack.createCard(targetElement);
        card.on('throwout', that._onThrowOut);
    });

    // Add event listener for when a card is thrown out of the stack.
  },

  componentDidUpdate: function() {
    // Prepare the cards in the stack for iteration.
    this.cards = [].slice.call(document.querySelectorAll('ul li'))

    var that = this;
    var card;
    this.cards.forEach(function (targetElement) {
        // Add card element to the Stack.
        card = that.stack.createCard(targetElement);
        card.on('throwout', that._onThrowOut);
    });
  },

  componentWillMount: function() {
    ItemStore.on("change", this._onItemStoreChange);
  },

  componentWillUnmount: function () {
    ItemStore.off("change", this._onItemStoreChange);
  },

  render: function() {
    var that = this;
    return (
      <div id="viewport">
        <ul className="stack">
        {this.state.items.map(function(item, index) {
          var backgroundUrl = item.get(ENV.IMAGE_URL);
          var bgi = {
            backgroundImage: "url(" + backgroundUrl + ")",
            backgroundSize: "cover"
          }
          return <li onClick={that._showItem.bind(that, item)} style={bgi} key={backgroundUrl+index+new Date().getTime()}></li>
        })}
        </ul>
      </div>
    );
  },

  _onItemStoreChange: function() {
    this.setState(this._getData());
  },

  _getData: function() {
    var items = ItemStore.get() || [];
    return {
      items: items
    };
  },

  _onThrowOut: function(e) {
    ItemActions.like(this.state.items[this.state.items.length - 1]);
  },

  _showItem: function(item) {
    ViewActions.showItem(item);
  }
});

module.exports = Items;
