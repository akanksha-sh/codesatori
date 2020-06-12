import React, { Component } from "react";
import {
  Button,
  Card,
  CardTitle,
  CardText,
  FormGroup,
  FormText,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  role: 0,
  isLoading: false,
  error: null,
};

export class UserDetailsForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillUnmount() {
    this.setState({ isLoading: false });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.role,
      email: this.props.authUser.email,
    };
    this.setState({ isLoading: true });
    this.props.authUser.getIdToken().then((idToken) => {
      // add data to PostgresSQL
      if (idToken != null) {
        this.props
          .postUserDetails(idToken, userDetails)
          .then((res) => {
            this.props.callback();
          })
          .catch((error) => {
            console.log("Error from backend: ", error);
          });
      }
    });
    event.preventDefault();
  };

  checkNameValid = (name) => {
    if (name.search(/[^a-zA-Z]/) !== -1) {
      return false;
    }
    return true;
  };

  render() {
    const { firstName, lastName, role, error } = this.state;

    const isFirstNameInvalid = !this.checkNameValid(firstName);
    const isLastNameInvalid = !this.checkNameValid(lastName);
    const isFormIncomplete = firstName === "" || lastName === "";

    const isInvalid =
      isFirstNameInvalid || isLastNameInvalid || isFormIncomplete;

    return (
      <div className="d-flex justify-content-center text-center min-vh-100 align-items-center">
        <div style={{ width: "30em" }}>
          <Card body className="text-center">
            <div className="py-4 px-5">
              <CardTitle className="mb-5">
                <h2 className="">First things first...</h2>
                <h6>Tell us more about yourself!</h6>
              </CardTitle>
              <CardText>
                {this.state.isLoading ? (
                  <div>
                    <Spinner color="dark" className="mb-2" />
                  </div>
                ) : (
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup className="mb-4">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="material-icons md-dark">
                              account_circle
                            </i>
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
                    <FormGroup className="mb-4">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="material-icons md-dark">
                              account_circle
                            </i>
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
                    {error && (
                      <FormText className="mb-2">{error.message}</FormText>
                    )}
                    <div className="text-center pb-2 pt-4">
                      <Button type="submit" disabled={isInvalid}>
                        Let's go!
                      </Button>
                    </div>
                  </Form>
                )}
              </CardText>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default UserDetailsForm;
