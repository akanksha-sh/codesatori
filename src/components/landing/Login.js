import React, { Component } from 'react'
import {Button, Form, FormGroup,  Input } from 'reactstrap';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    handleFormChange = (event) => {    
        this.setState({[event.target.name] : event.target.value});  
    } 

    loginHandler = (e) => {
        e.preventDefault();
        this.props.handleLogIn(this.state.username, this.state.password);
    }

    render() {
        return (
            <div className="dropdown-menu-custom">
                <Form onSubmit={this.loginHandler}> 
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="username" name="username" onChange={this.handleFormChange} id="loginEmail" placeholder="username" />
                </FormGroup>
                <br/>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password" onChange={this.handleFormChange} id="loginPassword" placeholder="password" />
                </FormGroup>
                <br/>
                <Button style={{width: "100%"}}>Login</Button>
                </Form>
            </div>
        )
    }
}



export default Login
