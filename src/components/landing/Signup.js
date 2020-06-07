import React, { Component } from 'react';
import { withFirebase } from '../../firebase';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from "reactstrap";
 
const SignUp = () => (
  <div className="container" style={signUpStyle}>
    <h1 className="display-5 text-center" style={{marginBottom: "30px"}}>Join us now</h1>
    <div className="container">
      <SignUpForm />
    </div>
  </div>
);
 
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {

    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Form onSubmit={this.onSubmit}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input
          type="username"
          name="username"
          value={username}
          onChange={this.onChange}
          id="username"
          placeholder="Username"
        />
      </FormGroup>
      <br />
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input
          type="email"
          name="email"
          value={email}
          onChange={this.onChange}
          id="email"
          placeholder="Email"
        />
      </FormGroup>
      <br />
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input
          type="password"
          name="passwordOne"
          onChange={this.onChange}
          value={passwordOne}
          id="passwordOne"
          placeholder="Password"
        />
      </FormGroup>
      <br />
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input
          type="password"
          name="passwordTwo"
          onChange={this.onChange}
          value={passwordTwo}
          id="passwordTwo"
          placeholder="Confirm password"
        />
      </FormGroup>
      <br/>
      <div className="text-center">
        <Button type="submit">Sign Up</Button>
      </div>
      
  
      {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const signUpStyle = {fontFamily : "Roboto", "padding-top": "20px"}

const SignUpForm = withFirebase(SignUpFormBase);
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link exact to="/signup">Sign Up</Link>
  </p>
);
 
export default SignUp;
 
export { SignUpForm, SignUpLink };