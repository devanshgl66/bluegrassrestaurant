import React from "react";
import { Row, Col, Button } from "reactstrap";

const Main = (props) => {
  return (
    <div>
      <Row noGutters className="text-center align items-center">
        <Col>
          <p>If you are looking for best dinner you have come to right place</p>
          <span className="fa fa-cutlery fa-lg"></span>
          <Button
            color="none"
            onClick={() => {
              props.setpage(1);
            }}
          >
            Book a table
          </Button>
        </Col>
      </Row>
      <Row noGutters className="text-center ">
        <img
          src="../assets/images/cafe.jpeg"
          alt="restaurant"
          className="big-img"
        />
      </Row>
    </div>
  );
};

export default Main;
