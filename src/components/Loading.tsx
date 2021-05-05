import Spinner from "react-bootstrap/Spinner";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
