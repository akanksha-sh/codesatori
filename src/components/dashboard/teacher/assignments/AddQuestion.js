import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";

export class AddQuestion extends Component {
  state = {
    title: " ",
    languageValue: 0,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addQuestion(this.state.title, this.state.languageValue);
  };

  render() {
    return (
      <>
        <Form onSubmit={this.onSubmit} style={formStyle}>
          <Container className="themed-container" fluid="lg">
            <FormGroup row>
              <Label for="title">
                <h5>Enter Question </h5>
              </Label>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="material-icons md-dark">code</i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="select"
                  name="languageValue"
                  id="languageValue"
                  value={this.state.languageValue}
                  onChange={this.onChange}
                >
                  <option value={0}>Java</option>
                </Input>
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="material-icons md-dark">help</i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="textarea"
                  name="title"
                  id="title"
                  placeholder="Write a description of what you want your student to program..."
                  value={this.state.value}
                  onChange={this.onChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup row>
              <Button color="primary" style={{ width: "100%" }}>
                Add Question
              </Button>
            </FormGroup>
          </Container>
          <br />
        </Form>
      </>
    );
  }
}

export default AddQuestion;

//style={{ marginLeft: "40px", marginTop: "35px" }}
const formStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
