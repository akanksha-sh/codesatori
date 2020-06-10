import React, { Component } from "react";
import { withFirebase } from "../../firebase";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const INITIAL_STATE = {
  email: "",
  password: "",
  demo: false,
  error: null,
};

class LoginFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleFormChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheck = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onSubmit = (event) => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onGoogleSubmit = (event) => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <div className="dropdown-menu-custom">
        <Form onSubmit={this.onSubmit}>
          <FormGroup className="mb-3">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="material-icons md-dark">email</i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="email"
                value={email}
                onChange={this.handleFormChange}
                placeholder="email"
              />
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
                name="password"
                value={password}
                onChange={this.handleFormChange}
                placeholder="password"
              />
            </InputGroup>
          </FormGroup>
          {error && (
            <FormText className="mb-2">Invalid email or password</FormText>
          )}
          <div className="text-center pb-2 pt-2">
            <Button
              disabled={isInvalid}
              type="submit"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </div>
        </Form>
        <div className="text-center pb-2 pt-2">
          <Button
            color="light"
            style={{ width: "100%" }}
            onClick={this.onGoogleSubmit}
          >
            {" "}
            <div class="col-md-12">
              {" "}
              <img
                className="mr-1"
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt=""
              />{" "}
              Log in with Google{" "}
            </div>
          </Button>
        </div>
      </div>
    );
  }
}

const LoginForm = withFirebase(LoginFormBase);

export default LoginForm;
