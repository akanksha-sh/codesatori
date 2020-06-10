import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export class AddQuestion extends Component {

    state = {
        title: " ",
      };
    
      onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
      onSubmit = (e) => {
        e.preventDefault();
        this.props.addQuestion(this.state.title);
        this.setState({ title: "" });
      };

    render() {
        return (
            <Form onSubmit={this.onSubmit} style={{ display: "flex" }}>
                <FormGroup style={formElemStyle} className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="title" className="mr-sm-2">
                    {/* {" "} */}
                    Title
                </Label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="e.g. Tutorial 1: Intro to example"
                    value={this.state.value}
                    onChange={this.onChange}
                />
                </FormGroup>
                <Button style={{ marginLeft: "40px", marginTop: "13px" }}>
                  Add
                </Button>
            </Form>
        )
    }
}

export default AddQuestion

const formElemStyle = {
    margin: "20px",
    marginBottom: "40px",
    marginRight: "40px",
  };