import React, { Component } from 'react'
import {Button, Form, FormGroup,  Input } from 'reactstrap';

export class AddStudent extends Component {
    submitHandler = (e) => {
        e.preventDefault();
        //Signup here
    }

    render() {
        return (
            <div className="dropdown-menu-custom">
                <Form onSubmit={this.submitHandler}> 
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="username" name="username" id="selectEmail" placeholder="Add user" />
                </FormGroup>
                <br/>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="select" name="select" id="classSelect">
                    <option>Add group</option>
                    <option>Class 17S</option>
                    <option>Class 16H</option>
                    <option>Class 17B</option>
                    </Input>
                </FormGroup>
                <br/>
                <Button className="mb-2 mr-sm-2 mb-sm-0">Add</Button>
                </Form>
            </div>
        )
    }
}

export default AddStudent
