var React = require("react");
var Swing = require("../components/swing.min.js");

var Deck = React.createClass({
  stack: gajus.Swing.Stack(),
  cards: [],
  images: [],
/*
  getInitialState: function() {
    return this._getData()
  },
*/

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
/*
  componentWillMount: function() {
    ItemStore.on("change", this._onItemStoreChange);
  },
*/
  render: function() {
    return (
      <div id="viewport">
        <ul className="stack">
          <li>abc</li>
          <li>def</li>
          <li>ghi</li>
        </ul>
      </div>
    );
  },

/*
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
  },
*/  
  _onThrowOut: function(e) {
    console.log(e);
    var card = this.stack.getCard(e.target);
    console.log(card);
  }
});

module.exports = Deck;