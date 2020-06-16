import React, { Component } from "react";
import { Button, ListGroupItem, FormGroup } from "reactstrap";
import * as Globals from "../../../../Globals";
import AuthUserContext from "../../../../session/Context";
import axios from "axios";
import CodeEditor from "./CodeEditor";
import CompilerOutput from "./CompilerOutput";

export class TutorialListItem extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
    this.state = {
      code: this.props.answer.answerBody,
      languageIndex: this.props.question.languageValue,
      isCompiling: false,
      compilerOut: null,
    };
  }

  clickHandler = (e) => {
    e.preventDefault();
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  updateCode = (code) => this.setState({ code: code });

  onClick = (e) => {
    e.preventDefault();
    this.setState({ isCompiling: true });
    const userContext = this.context;
    userContext.authUser.getIdToken().then(async (idToken) => {
      console.log(
        "Contextual User: " + JSON.stringify(userContext.userDetails)
      );
      console.log("Code: " + this.state.code);

      let [compileRet] = await Promise.all([
        axios({
          url: Globals.BACKEND_URL + "compiler",
          method: "POST",
          headers: {
            Authorization: "Bearer " + idToken,
          },
          data: {
            code: this.state.code,
            languageIndex: this.state.languageIndex,
          },
        }),
      ]);
      console.log("Compiler Out: " + JSON.stringify(compileRet.data));
      this.setState({ isCompiling: false, compilerOut: compileRet.data });
    });
  };

  render() {
    let text = this.props.question.questionText;

    return (
      <ListGroupItem>
        <h5> {text} </h5>
        <br />
        <FormGroup>
          <div>
            <CodeEditor
              style={{ ...editorStyle, float: "left" }}
              code={this.state.code}
              onChange={this.updateCode}
              languageIndex={this.state.languageIndex}
            />
            <CompilerOutput
              style={{ ...editorStyle, float: "right" }}
              fetching={this.state.isCompiling}
              output={this.state.compilerOut}
            />
          </div>
          <Button
            color="primary"
            onClick={this.onClick}
            style={{ width: "100%" }}
          >
            Run Code
          </Button>
        </FormGroup>
      </ListGroupItem>
    );
  }
}

export default TutorialListItem;

const editorStyle = {
  borderStyle: "groove",
  float: "left",
  height: "400px",
  overflowY: "scroll",
  width: "50%",
};
