import React, { Component, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBIcon } from 'mdb-react-ui-kit';
import Form from "react-validation/build/form";

import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from  '../services/auth.service';
import logoResto from '../logoResto.jpeg';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }
  render(){
 
  return (
    <MDBContainer className="my-5 gradient-form">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
            <img src={logoResto}
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">welcome to your restaurant</h4>
            </div>

            <p style={{fontWeight: "bold"}}>Registre Page</p>
            <Form onSubmit={this.handleRegister}
                  ref={(c) => {
                    this.form = c;
                  }}>

            <MDBInput wrapperClass='mb-4' id='form1' placeholder="Enter your username" type='text' value={this.state.username} onChange={this.onChangeUsername} 
            validations={[required,vusername]}/>
            <MDBInput wrapperClass='mb-4' placeholder="Enter your email" id='form1' type='email' value={this.state.email} onChange={this.onChangeEmail} 
            validations={[required,email]}/>
            <MDBInput wrapperClass='mb-4' placeholder="Enter your password" id='form2' type='password' value={this.state.password} onChange={this.onChangePassword} 
            validations={[required,vpassword]}/>


            <div className="text-center pt-1 mb-5 pb-1">
              <button className="mb-4 w-100 gradient-custom-2" disabled={this.state.loading} type='submit'> 
              {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}Sign up</button>
                    {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {this.state.message}
                      </div>
                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Login Page  </p>

              <a href='/'>
                Login
                </a>
              
            </div>
            </Form>
          </div>
         
        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
            <img src="https://restaurant-lasiesta.fr/wp-content/uploads/2022/12/la-siesta-restaurant-canet-en-roussillon-2-570x855.jpeg"
                style={{width: '400px'}} alt="logo" />
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}   
}

export default Register;