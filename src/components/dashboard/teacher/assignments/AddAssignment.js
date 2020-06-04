import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class AddAssignment extends Component {
    state={
        title: ' ',
        date: ' ',
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addAssignment(this.state.title);
        this.setState({title: ''})
        // this.setState({date: ''})     ideally store this (but dummy data anyway)
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} style={{display:'flex'}} inline>
            <FormGroup style={formElemStyle} className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="title" className="mr-sm-2"> Title</Label>
              <Input type="text" name="title" id="title" placeholder="e.g. Tutorial 1: Intro to example" value={this.state.value} onChange={this.onChange} />
            </FormGroup>
            <FormGroup style={formElemStyle} className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="date" className="mr-sm-2"> Deadline</Label>
              <Input type="date" name="date" id="title" value={this.state.value} onChange={this.onChange} />
            </FormGroup>
            <FormGroup style={formElemStyle} className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="group" className="mr-sm-2">Class</Label>
              <Input type="select" name="group" id="group" placeholder="e.g. Class 19B" >
                <option>For class</option>
                <option>AL Comptuing</option>
                <option>IGCSE Computing</option>
                <option>AL Maths</option>
              </Input>
            </FormGroup>
            <Button style={{marginLeft:"40px", marginTop:"13px"}}>Submit</Button>
          </Form>
        )
    }
}

export default AddAssignment

const formElemStyle = {
    margin: "20px",
    marginBottom: "40px",
    marginRight: "40px"
}