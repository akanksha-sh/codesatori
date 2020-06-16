import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { contentDiv } from "../../../../Style";
import EmailChips from "./EmailChips";

const INITIAL_STATE = {
  className: "",
  items: [],
  emailValue: "",
};

export class AddClass extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(this.state));
    this.props.addClass(this.state.className, this.state.items);
    this.setState({ ...INITIAL_STATE });
  };

  handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.emailValue.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.emailValue],
          emailValue: "",
        });
      }
    }
  };

  onChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: null,
    });
  };

  handleDelete = (item) => {
    this.setState({
      items: this.state.items.filter((i) => i !== item),
    });
  };

  handlePaste = (evt) => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter((email) => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded],
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} style={{ display: "flex" }} inline>
        <Container>
          <Row>
            <Col xs="auto">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="title" className="mr-sm-2">
                  Class Name
                </Label>
                <Input
                  type="text"
                  name="className"
                  id="title"
                  placeholder="e.g. AL Computing"
                  value={this.state.className}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <>
                  <Label for="title" className="mr-sm-2">
                    Students:
                  </Label>
                  {this.state.items.map((item) => (
                    <div className="tag-item" key={item}>
                      {item}
                      <button
                        type="button"
                        className="button"
                        onClick={() => this.handleDelete(item)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}

                  <Input
                    type="text"
                    value={this.state.emailValue}
                    name="emailValue"
                    placeholder="Email address"
                    onKeyDown={this.handleKeyDown}
                    onChange={this.onChange}
                    onPaste={this.handlePaste}
                  />

                  {this.state.error && (
                    <p className="error">{this.state.error}</p>
                  )}
                </>
              </FormGroup>
            </Col>
            <Col xs="auto">
              <Button className="mb-2 mr-sm-2 mb-sm-0">Add class</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    );
  }
}

export default AddClass;

// const formElemStyle = {
//   margin: "20px",
//   marginBottom: "40px",
//   marginRight: "40px",
// };
