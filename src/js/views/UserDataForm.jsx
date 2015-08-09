"use strict"

var React = require("react");

var UserActions = require("./../actions/UserActions");
var UserStore = require("./../stores/UserStore");

var UserDataForm = React.createClass({
  getInitialState() {
    return this._getData()
  },

  componentWillMount() {
    UserStore.on("change", this._onUserStoreChange);
  },

  componentWillUnmount() {
    UserStore.off("change", this._onUserStoreChange);
  },

  render() {
    return (
      <div className="login">
        I am looking for shoes for:
        <br />
        <i className={"fa fa-user fa-2x"}></i>
        <input type="text" placeholder="Shoes" onChange={this._onShoes} />
        <br />
        Age:
        <br />
        <i className={"fa fa-user fa-2x"}></i>
        <input type="text" placeholder="Age" onChange={this._onAge} />
        <br />
        City:
        <br />
        <i className={"fa fa-user fa-2x"}></i>
        <input type="text" placeholder="City" onChange={this._onCity} />
        <br />
        Shoe Size
        <br />
        <i className={"fa fa-user fa-2x"}></i>
        <input type="text" placeholder="Shoe size" onChange={this._onShoeSize} />
        <br />
        Interests:
        <br />
        <i className={"fa fa-user fa-2x"}></i>
        <input type="text" placeholder="Interests" onChange={this._onInterests} />
        <br />
        <i className={"fa fa-sign-in fa-2x"}></i>
        <span onClick={this._saveUserData} className="loginButton"> Save</span>
        <br />
      </div>
    );
  },

  _saveUserData() {
    UserActions.saveUserData({
      shoes: this.state.shoes,
      city: this.state.city,
      age: this.state.age,
      shoeSize: this.state.shoeSize,
      interests: this.state.interests
    });
  },


  _getData() {
    return {
      currentUser: UserStore.get()
    };
  },

  _onUserStoreChange() {
    this.setState(this._getData());
  },

  _onShoes(): event {
    this.setState({
      shoes: event.target.value
    });
  },

  _onCity(): event {
    this.setState({
      city: event.target.value
    });
  },

  _onAge(): event {
    this.setState({
      age: event.target.value
    });
  },

  _onShoeSize(): event {
    this.setState({
      shoeSize: event.target.value
    });
  },

  _onInterests(): event {
    this.setState({
      interests: event.target.value
    });
  },
});

export default UserDataForm;
