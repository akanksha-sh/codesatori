import React, { Component } from 'react'
import { Button, ListGroupItem, FormGroup, Label, Input } from "reactstrap";
import * as Globals from "./../../../../Globals"
import axios from "axios"
import AuthUserContext from '../../../../session/Context'

export class TutorialListItem extends Component {
    static contextType = AuthUserContext

    state = {
        inactiveShown: false,
        isLoading: true,
        error: null,
        code: "",
    };

    clickHandler = (e) => {
        e.preventDefault();
      };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value, code:  e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        this.runCode(this.state.code);
    }

    runCode = (code) => {
      console.log("Trying to run the code: " + code)
      const userContext = this.context
      const codeBody = {
        code: code, 
        // languageValue: 0
      }
		  userContext.authUser.getIdToken().then(async (idToken) => {
        axios({
          url: Globals.BACKEND_URL + "code/compile",
          method: "GET",
          headers: {
            Authorization: "Bearer " + idToken,
          },
          data: {... codeBody},
        }).then((res) => {
          const result = JSON.stringify(res.data)
          console.log("Retrieved the following result: ", result)
        })
        .catch((error) => {
          console.log("Error from backend: ", error)
        });
      });
    }
    
    render() {
        const { id, question } = this.props.question;

        return (
            <ListGroupItem>
                <h5> Question {id} </h5>
                {question}
                <FormGroup>
                <Input type="textarea" name="text" id="code" placeholder="write code here..."
                    onChange={this.onChange}/>
                </FormGroup>
                <button 
                    style={BtnStyle} 
                    // onMouseEnter={(e) => e.target.style.background= "#e5e5e5"}
                    // onMouseLeave={(e) => e.target.style.background= "#b73e3a"}
                    onClick={this.onSubmit}
                    > 
                    Run test
                </button>
            </ListGroupItem>
        )
    }
}

export default TutorialListItem

const BtnStyle = {
    background: '#b73e3a',
    color: '#fff',
    border: 'none',
    height: '25px',
    width: '50px',
    cursor: 'pointer',
    fontSize: '6pt',
    margin: '5pt',
    marginLeft: 'auto',
}
