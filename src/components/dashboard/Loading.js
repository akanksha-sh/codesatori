import React from "react";
import { Spinner } from "reactstrap";

const Loading = () => (
  <div className="d-flex justify-content-center text-center min-vh-100 align-items-center">
    <div>
      <Spinner color="dark" className="mb-2" />
      <p>Logging you in...</p>
    </div>
  </div>
);

export default Loading;
