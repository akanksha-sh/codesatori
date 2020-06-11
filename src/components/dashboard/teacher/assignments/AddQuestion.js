import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, ListGroupItem, Container } from "reactstrap";

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
          <>
            <Form onSubmit={this.onSubmit} style={formStyle}>
            <Container className="themed-container" fluid="lg">
                <FormGroup row>
                <Label for="title">
                    {/* {" "} */}
                    <h5>Enter Question </h5>
                </Label>
                <br/>
                <Input
                    type="textarea"
                    name="title"
                    id="title"
                    placeholder="Write a fuction ..."
                    value={this.state.value}
                    onChange={this.onChange}
                />
                </FormGroup>
                </Container>

                <br/>
                
                <FormGroup row>
                <Button style={{marginLeft: "40px", marginTop: "35px" }}>
                  Add
                </Button>
                </FormGroup>
            </Form>
            </>
        )
    }
}

export default AddQuestion

const formElemStyle = {
    margin: "20px",
    marginBottom: "40px",
    marginRight: "40px",
  };

  const formStyle =  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}