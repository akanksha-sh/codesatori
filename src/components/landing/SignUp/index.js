import React, { Component } from "react";
import { withFirebase } from "../../../firebase";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const SignUp = () => (
  <div className="container" style={signUpStyle}>
    <h1 className="display-5 text-center" style={{ marginBottom: "30px" }}>
      Join us now
    </h1>
    <div className="container">
      <SignUpForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  checkPwdValid = (str) => {
    if (str.length < 6) {
      return "Password is too short!"; //too short
    } else if (str.length > 50) {
      return "Password is too long!"; //too long
    } else if (str.search(/\d/) === -1) {
      return "Password does not contain a number!"; // no number
    } else if (str.search(/[A-Z]/) === -1) {
      return "Password does not contain a capital letter!"; // no capital letter
    } else if (str.search(/[a-zA-Z]/) === -1) {
      return "Password does not contain a letter!"; //no letter
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
      return "Password contains a bad character!";
    }
    return 0; //valid
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const passwordValidState = this.checkPwdValid(passwordOne);

    const isEmailInvalid = !this.checkEmailValid(email); //check email
    const isUsernameInvalid = false; //check if username taken
    const isPasswordInvalid = passwordValidState !== 0; //check if password contains stuff
    const isPasswordNotTheSame = passwordOne !== passwordTwo;
    const isFormIncomplete =
      passwordOne === "" ||
      passwordTwo === "" ||
      email === "" ||
      username === "";
    const isInvalid =
      isEmailInvalid ||
      isUsernameInvalid ||
      isPasswordInvalid ||
      isPasswordNotTheSame ||
      isFormIncomplete;

    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup className="mb-3">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="material-icons md-dark">account_circle</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="username"
              name="username"
              value={username}
              onChange={this.onChange}
              id="username"
              placeholder="Username"
              invalid={username !== "" && isUsernameInvalid}
              valid={username !== "" && !isUsernameInvalid}
            />
            <FormFeedback valid={false}>Username already taken!</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="material-icons md-dark">email</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={this.onChange}
              id="email"
              placeholder="Email"
              invalid={email !== "" && isEmailInvalid}
              valid={email !== "" && !isEmailInvalid}
            />
            <FormFeedback valid={false}>
              Please enter a valid email.
            </FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="material-icons md-dark">lock</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="password"
              name="passwordOne"
              onChange={this.onChange}
              value={passwordOne}
              id="passwordOne"
              placeholder="Password"
              invalid={passwordOne !== "" && isPasswordInvalid}
              valid={passwordOne !== "" && !isPasswordInvalid}
            />
            <FormFeedback valid={false}>{passwordValidState}</FormFeedback>
            <FormFeedback valid={false}>
              Password must be at least 8 characters long, and contain at least
              1 capital letter and 1 number.
            </FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="material-icons md-dark">lock</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="password"
              name="passwordTwo"
              onChange={this.onChange}
              value={passwordTwo}
              id="passwordTwo"
              placeholder="Confirm password"
              invalid={
                passwordOne !== "" && passwordTwo !== "" && isPasswordNotTheSame
              }
              valid={
                passwordOne !== "" &&
                passwordTwo !== "" &&
                !isPasswordNotTheSame
              }
            />
            <FormFeedback valid={false}>
              The passwords don't match!
            </FormFeedback>
          </InputGroup>
        </FormGroup>
        {error && <FormText className="mb-2">{error.message}</FormText>}
        <div className="text-center pb-2 pt-2">
          <Button type="submit" disabled={isInvalid}>
            Sign Up
          </Button>
        </div>
      </Form>
    );
  }
}

const signUpStyle = { fontFamily: "Roboto", paddingTop: "20px" };

const SignUpForm = withFirebase(SignUpFormBase);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
);

export default SignUp;

export { SignUpForm, SignUpLink };
