import React, { Component } from 'react';
import authService from  '../services/auth.service';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { withRouter } from '../common/with-router';
import logoResto from '../logoResto.jpeg';
 
import '../login.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import { Button } from 'bootstrap';
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      authService.login(this.state.username, this.state.password).then(
        () => {
          this.props.router.navigate("/mapAll");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
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

            <p style={{fontWeight: "bold" }}>Login Form</p>
            <Form onSubmit={this.handleLogin}
                  ref={(c) => {
                    this.form = c;
                  }}>

            <MDBInput wrapperClass='mb-4' label='' placeholder='Enter your email ' id='form1' type='text' value={this.state.username} onChange={this.onChangeUsername} 
            validations={[required]}/>
            <MDBInput wrapperClass='mb-4' label='' id='form2' type='password' placeholder='Enter your Password ' value={this.state.password} onChange={this.onChangePassword} 
            validations={[required]}/>


            <div className="text-center pt-1 mb-5 pb-1">
              <button className="mb-4 w-100 gradient-custom-2" disabled={this.state.loading} type='submit'> 
              {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}Sign in</button>
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
              <p className="mb-0">Don't have an account?</p>
              <a href='/Register'>
                Register
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

export default withRouter(Login);