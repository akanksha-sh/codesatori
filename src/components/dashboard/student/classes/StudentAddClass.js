import React, { Component } from 'react'
import { Row,  Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { contentDiv } from '../../../../Style';

export class StudentAddClass extends Component {
    state={
        nameOfClass: '',
        classCode: ''
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})
    
    onSubmit = (e) => {
        e.preventDefault();
        // Communicate with database to verify existence of class. If it doesn't exit, handle error
        this.props.addClass(this.state.nameOfClass);
        this.setState({nameOfClass: '', classCode: ''})
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} style={{display:'flex'}} inline>
            <FormGroup style={formElemStyle} className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="nameOfClass" className="mr-sm-2">Class Name</Label>
              <Input type="text" name="nameOfClass" id="nameOfClass" placeholder="e.g. AL Computing" value={this.state.value} onChange={this.onChange} />
            </FormGroup>
            <FormGroup style={formElemStyle} className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="classCode" className="mr-sm-2">Class Code</Label>
              <Input type="text" name="classCode" id="classCode" placeholder="e.g. 69AW8Z" value={this.state.value} onChange={this.onChange}/>
            </FormGroup>
            <Button style={{marginLeft:"40px", marginTop:"13px"}}>Submit</Button>
          </Form>
        )
    }
}

export default StudentAddClass

const formElemStyle = {
    margin: "20px",
    marginBottom: "40px",
    marginRight: "40px"
}