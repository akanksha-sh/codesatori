import React, { Component } from 'react'
import {Button, Form, FormGroup,  Input } from 'reactstrap';

export class Signup extends Component {

    signupHandler = (e) => {
        e.preventDefault();
        //Signup here
    }

    render() {
        return (
            <div style={signupStyle}>
                <Form onSubmit={this.signupHandler}> 
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="email" name="email" id="loginEmail" placeholder="email" />
                </FormGroup>
                <br/>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password" id="loginPassword" placeholder="password" />
                </FormGroup>
                <br/>
                <Button style={{width: "100%"}}>Sign Me Up!</Button>
                </Form>
            </div>
        )
    }
}

const signupStyle = {
    width: "300px",
    margin: "10px 20px",
  };

export default Signup
