import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

export class StudentAssignment extends Component {
    render() {
        return (
          <div style={{marginTop: "20px"}}>
          <h2 style={{textAlign:"center", margin:"30px"}}>Assignments</h2>
          <h4>Ongoing</h4>
          <ListGroup style={{marginTop: "20px", marginBottom: "20px"}}>
          <ListGroupItem>Tutorial 2: Programming in Python</ListGroupItem>
          <ListGroupItem>Tutorial 1: Introduction to complex numbers</ListGroupItem>
          <ListGroupItem>Tutorial 2: Microprocessors</ListGroupItem>
          </ListGroup>
          <br></br>
          <h4>Recieved</h4>
          <ListGroup style={{marginTop: "20px", marginBottom: "20px"}}>
          <ListGroupItem>Tutorial 1: Programming in Python</ListGroupItem>
          <ListGroupItem>Tutorial 2: What are supercomputers?</ListGroupItem>
        </ListGroup>
        </div>
        )
    }
}

export default StudentAssignment
