import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {
    constructor(){
        super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
      if (nextProps.errors){
          this.setState ({
              errors: nextProps.errors
          });

      }
  }



  onChange(e) {
    console.log("onchange");
    this.setState({ [e.target.name]: e.target.value });
    }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log("LINE 39 REGISTER.JS");
    this.props.createNewUser(newUser, this.props.history);
  }


  render() {
      const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className= {classnames("form-control form-control-lg", {
                        "is-invalid": errors.name
                    }) }
                    placeholder="Name"
                    name="fullName"
                    value= {this.state.name}
                    required
                    onChange = {this.onChange}
                  />
                  {errors.name && (
                      <div className= "invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="username"
                    onChange = {this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    onChange = {this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange = {this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Register.propTypes = {
//     createProject: PropTypes.func.isRequired
//   };
  
export default connect(
    null,
    { createNewUser }
  )(Register);