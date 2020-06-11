import React, { Component } from "react";
import { Button, ListGroupItem, FormGroup, Label, Input } from "reactstrap";
import * as Globals from "../../../../Globals";
import AuthUserContext from "../../../../session/Context";
import axios from "axios";

export class TutorialListItem extends Component {
  static contextType = AuthUserContext;

  static INITIAL =
    'public class Solution {\npublic static void main(String[] args) {\nSystem.out.println("Hello World!");\n}\n}';

  constructor() {
    super();
    this.state = {
      value: this.INITIAL,
      isCompiling: false,
      success: true,
      compilerOut: "",
    };
  }

  clickHandler = (e) => {
    e.preventDefault();
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onClick = (e) => {
    e.preventDefault();
    this.setState({ isCompiling: true });
    const userContext = this.context;
    userContext.authUser.getIdToken().then(async (idToken) => {
      console.log(
        "Contextual User: " + JSON.stringify(userContext.userDetails)
      );
      
      let [compileRet] = await Promise.all([
        axios({
          url: Globals.BACKEND_URL + "code/compile",
          method: "GET",
          headers: {
            Authorization: "Bearer " + idToken,
          },
          data: {
            code: this.state.value,
            languageValue: 0,
          },
        }),
      ]);
      console.log(
        "Compiler Out: " + JSON.stringify(compileRet.data)
      );
      this.setState({ isCompiling: false });
    });
  };

  render() {
    const { id, questionText } = this.props.question;

    return (
      <ListGroupItem>
        <h5> Question {id + 1} </h5>
        {questionText}
        <FormGroup>
          <Input
            type="textarea"
            name="value"
            id="value"
            rows="10"
            value={this.state.value}
            placeholder='public class Solution {
              public static void main(String[] args) {
                System.out.println("Hello World!");
              }
            }'
            onChange={this.onChange}
          />
          <Button onClick={this.onClick} style={{ width: "100%" }}>
            Compile
          </Button>
        </FormGroup>
      </ListGroupItem>
    );
  }
}

export default TutorialListItem;
