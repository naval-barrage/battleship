import React, { Component } from "./node_modules/react";
import "./login.scss";
import { connect } from "react-redux";
import { updateUser } from "../../redux/reducer";

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return <div className="Login"></div>;
  }
}

function mapStateToProps(state){
    const {user} = state;
    return {user}
}

export default connect(
  null,
  { updateUser }
)(Login);
