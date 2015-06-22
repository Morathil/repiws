var React = require("react");

var CloseMenuButton = React.createClass({
  render: function() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
});
  
var MenuItem = React.createClass({
  render: function() {
    return <div onClick={this.props.onClick} className="menu-item">{this.props.children}</div>;
  }
});
  
var Menu = React.createClass({
  getInitialState: function() {
    return {
      visible: false	
    };
  },
  
  show: function() {
    this.setState({ visible: true });
  },
  
  hide: function() {
    this.setState({ visible: false });
  },
  
  
  render: function() {
    return <div className="menu">
        <div className={(this.state.visible ? "visible" : "") + " right " + this.props.type}>
          <CloseMenuButton onClick={this.hide}>Close</CloseMenuButton>
          {this.props.children}
        </div>
      </div>;
  }
});

module.exports = {
  Menu: Menu,
  MenuItem: MenuItem
}