import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { ButtonGroup } from 'reactstrap';
import {Link} from 'react-router-dom'


export class Assignment extends Component {
    render() {
        return (
          <div style={{marginTop: "20px"}}>
          <h2 style={{textAlign:"center", margin:"30px"}}>Assignments</h2>
          <h4>Ongoing</h4>
          <ListGroup style={{marginTop: "20px", marginBottom: "20px"}}>
          <ListGroupItem> Tutorial 2 : Programming in Python
            <ButtonGroup style={{float:"right"}}> 
            <h6 style={{color: "grey"}}> 1w </h6> &nbsp; &nbsp; &nbsp;
            <Link to="/"><img style= {{width:"60%"}} src={require('./chat.png')} alt="chat" /></Link>
            <Link to="/"><img style= {{width:"60%"}} src={require('./deadline.jpg')} alt="deadline" /></Link>
            <Link to="/"><img style= {{width:"60%"}} src={require('./test.jpg')} alt="testSuite" /></Link>  
            </ButtonGroup> 
          </ListGroupItem>

          <ListGroupItem> Tutorial 1 : Introduction to complex numbers
            <ButtonGroup style={{float:"right"}}> 
            <h6 style={{color: "grey"}}> 1w </h6> &nbsp; &nbsp; &nbsp;
            <Link to="/"><img style= {{width:"60%"}} src={require('./chat.png')} alt="chat" /></Link>
            <Link to="/"><img style= {{width:"60%"}} src={require('./deadline.jpg')} alt="deadline" /></Link>
            <Link to="/"><img style= {{width:"60%"}} src={require('./test.jpg')} alt="testSuite" /></Link>   
            </ButtonGroup> 
          </ListGroupItem>

          <ListGroupItem>Tutorial 2 : Microprocessors
            <ButtonGroup style={{float:"right"}}> 
            <h6 style={{color: "grey"}}> 2w </h6> &nbsp; &nbsp; &nbsp;
            <Link to="/"><img style= {{width:"60%"}} src={require('./chat.png')} alt="chat" /></Link>
            <Link to="/"><img style= {{width:"60%"}} src={require('./deadline.jpg')} alt="deadline" /></Link>
            <Link to="/"><img style= {{width:"60%"}} src={require('./test.jpg')} alt="testSuite" /></Link>  
            </ButtonGroup> 
          </ListGroupItem>

          <br></br>
          </ListGroup>
          <h4>Recieved</h4>
          <ListGroup style={{marginTop: "20px", marginBottom: "20px"}}>
          <ListGroupItem>Tutorial 1 : Programming in Python
            <ButtonGroup style={{float:"right"}}> 
            <h6 style={{color: "green"}}>Marked</h6> &nbsp; &nbsp; &nbsp;
            <Link to="/"><img style= {{width:"50%"}} src={require('./feedback.jpg')} alt="feedback" /></Link>
            </ButtonGroup> 
          </ListGroupItem>

          <ListGroupItem>Tutorial 2 : What are supercomputers?
            <ButtonGroup style={{float:"right"}}> 
            <h6 style={{color: "red"}}>Pending</h6> &nbsp; &nbsp; &nbsp;
            <Link to="/"><img style= {{width:"50%"}} src={require('./tick.png')} alt="tick" /></Link>
            </ButtonGroup> 
            </ListGroupItem>

        </ListGroup>
        </div>
        )
    }
}

export default Assignment
