"use strict";

var React = require("react");

var ItemStore = require("./../stores/ItemStore");

var posAbs = {
  position: "absolute"
};

var Example = React.createClass({
	getInitialState: function() {
		return this._getItems();
	},

	componentWillMount: function() {
		ItemStore.on("change", this._onItemStoreChange);
	},

	render: function() {
		var content = null;

		if (this.state.items) {
			content = this.state.items[0].get("bla");
		}

		return (
			<div style={posAbs}>
				{content}
			</div>
		);
	},

	_onItemStoreChange: function() {
		this.setState(this._getItems());
	},

	_getItems: function() {
		return {
			items: ItemStore.get()
		};
	}
});

module.exports = Example;