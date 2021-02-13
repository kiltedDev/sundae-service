import React from "react";
import { Col } from "react-bootstrap";

export const ScoopOptions = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} lg={3} style={{ textAlign: "center" }}>
      <img
        src={`https://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
        style={{ width: "75%" }}
      />
    </Col>
  );
};

export default ScoopOptions;
