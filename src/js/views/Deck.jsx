var React = require("react");
var Swing = require("../components/swing.min.js");

var ItemActions = require("../actions/ItemActions");
var ItemStore = require("../stores/ItemStore");


var Deck = React.createClass({
  stack: gajus.Swing.Stack(),
  cards: [],
  images: [],

  getInitialState: function() {
    return this._getData()
  },

  componentDidMount: function() {
    // Prepare the cards in the stack for iteration.
    this.cards = [].slice.call(document.querySelectorAll('ul li'))
    
    var that = this;
    this.cards.forEach(function (targetElement) {
        // Add card element to the Stack.
        that.stack.createCard(targetElement);
    });
    
    // Add event listener for when a card is thrown out of the stack.
    this.stack.on('throwout', this._onThrowOut);
  },

  componentDidUpdate: function() {
    // Prepare the cards in the stack for iteration.
    this.cards = [].slice.call(document.querySelectorAll('ul li'))
    
    var that = this;
    this.cards.forEach(function (targetElement) {
        // Add card element to the Stack.
        that.stack.createCard(targetElement);
    });
  },

  componentWillMount: function() {
    ItemStore.on("change", this._onItemStoreChange);
  },

  render: function() {
    var that = this;
    return (
      <div id="viewport">
        <ul className="stack">
        {this.state.items.map(function(item, index) {
          var backgroundUrl = item.get("imageUrl");
          var bgi = {
            backgroundImage: "url(" + backgroundUrl + ")",
            backgroundSize: "cover"
          }
          return <li ref={"index" + index} style={bgi} key={index}></li>
        })}
        </ul>
      </div>
    );
  },

  _onItemStoreChange: function() {
    this.setState(this._getData());
  },

  _getData: function() {
    return {
      items: ItemStore.get() || []
    };
  },

  _onThrowOut: function(e) {
    ItemActions.like(this.state.items[this.state.items.length - 1]);
  }
});

module.exports = Deck;