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

const SignUp = (props) => (
  <div className="container pl-3 pr-3" style={signUpStyle}>
    <h1 className="display-5 text-center mb-3">Start coding today!</h1>
    <div className="container" style={{ width: "85%" }}>
      <SignUpForm {...props} />
    </div>
  </div>
);

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  role: 0,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, passwordOne } = this.state;
    const userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.role,
    };
    this.props.setNewUserDetails(userDetails);
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        console.log("User created successfully with payload:", authUser);
        //Write code to use authData to add to Users
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
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  checkNameValid = (name) => {
    if (name.search(/[^a-zA-Z]/) !== -1) {
      return false;
    }
    return true;
  }

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
    } else if (str.search(/[^a-zA-Z0-9!@#$%^&*()_+]/) !== -1) {
      return "Password contains a bad character!";
    }
    return 0; //valid
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
    } = this.state;

    const passwordValidState = this.checkPwdValid(passwordOne);
    const isFirstNameInvalid = !this.checkNameValid(firstName);
    const isLastNameInvalid = !this.checkNameValid(lastName);
    const isEmailInvalid = !this.checkEmailValid(email); //check email
    const isPasswordInvalid = passwordValidState !== 0; //check if password contains stuff
    const isPasswordNotTheSame = passwordOne !== passwordTwo;
    const isFormIncomplete =
      passwordOne === "" ||
      passwordTwo === "" ||
      email === "" ||
      firstName === "" ||
      lastName === "";
    const isInvalid =
      isFirstNameInvalid ||
      isLastNameInvalid ||
      isEmailInvalid ||
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
              type="firstName"
              name="firstName"
              value={firstName}
              onChange={this.onChange}
              id="firstName"
              placeholder="First Name"
              invalid={firstName !== "" && isFirstNameInvalid}
              valid={firstName !== "" && !isFirstNameInvalid}
            />
            <FormFeedback valid={false}>
              Please enter a valid first name.
            </FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup className="mb-3">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="material-icons md-dark">account_circle</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="lastName"
              name="lastName"
              value={lastName}
              onChange={this.onChange}
              id="lastName"
              placeholder="Last Name"
              invalid={lastName !== "" && isLastNameInvalid}
              valid={lastName !== "" && !isLastNameInvalid}
            />
            <FormFeedback valid={false}>
              Please enter a valid last name.
            </FormFeedback>
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
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="material-icons md-dark">layers</i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="select"
              name="role"
              id="role"
              value={role}
              onChange={this.onChange}
            >
              <option value={0}>Student</option>
              <option value={1}>Teacher</option>
            </Input>
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
