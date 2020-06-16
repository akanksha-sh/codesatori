import React from "react";
import { Alert, Spinner } from "reactstrap";

const CompilerOutput = (props) => {
  const alertFor = (output) => {
    console.log("Status Code Being Loaded: " + output.statusCode);
    return (
      <div>
        {ALERTS[output.statusCode]}
        <Alert
          style={{
            fontFamily:
              "source-code-pro, Menlo, Monaco, Consolas, 'Courier New'",
            overflowWrap: "break-word",
          }}
          color="light"
        >
          <b>{output.message}</b>
        </Alert>
      </div>
    );
  };

  return (
    <div style={props.style}>
      {props.fetching ? (
        <AlertForFetching />
      ) : props.output === null ? (
        <AlertForNull />
      ) : (
        alertFor(props.output)
      )}
    </div>
  );
};

export default CompilerOutput;

const alertStyle = {
  alignItems: "center",
  display: "flex",
  textAlign: "center",
};

const symbolStyle = {
  margin: "8px",
};

/* TODO: This is pretty badly programmed since it can all be parameterized. */
const AlertForFetching = () => {
  return (
    <Alert style={alertStyle} color="primary">
      <b>Compiler Status: Fetching Results </b>
      <br />
      <Spinner style={symbolStyle} />
      <br />
    </Alert>
  );
};

const AlertForNull = () => {
  return (
    <Alert style={alertStyle} color="dark">
      <b>Compiler Status: None </b>
      <br />
      <i style={symbolStyle} class="material-icons md-dark">
        remove_circle_outline
      </i>
      <br />
    </Alert>
  );
};

const AlertForSuccess = () => {
  return (
    <Alert style={alertStyle} color="success">
      <b>Compiler Status: Success </b>
      <br />
      <i style={symbolStyle} class="material-icons md-dark">
        check_circle_outline
      </i>
    </Alert>
  );
};

const AlertForRunTimeError = () => {
  return (
    <Alert style={alertStyle} color="danger">
      <b>Compiler Status: Run Time Error </b>
      <br />
      <i style={symbolStyle} class="material-icons md-dark">
        error_outline
      </i>
    </Alert>
  );
};

const AlertForCompileTimeError = () => {
  return (
    <Alert style={alertStyle} color="warning">
      <b>Compiler Status: Compile Time Error </b>
      <br />
      <i style={symbolStyle} class="material-icons md-dark">
        error_outline
      </i>
    </Alert>
  );
};

const AlertForBadRequest = () => {
  return (
    <Alert style={alertStyle} color="info">
      <b>Compiler Status: Bad Request </b>
      <br />
      <i style={symbolStyle} class="material-icons md-dark">
        help_outline
      </i>
    </Alert>
  );
};

const ALERTS = [
  <AlertForSuccess />,
  <AlertForRunTimeError />,
  <AlertForCompileTimeError />,
  <AlertForBadRequest />,
];
