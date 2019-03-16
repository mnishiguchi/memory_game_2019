import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import logo from "../assets/logo.png";
import "./App.css";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
    <Container className="my-3">
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Row className="py-3">
          <Col>100 points</Col>
          <Col>30 seconds</Col>
        </Row>
        <Row>
          <section
            style={{
              width: "100%",
              minHeight: "300px",
              backgroundColor: "salmon",
            }}
          >
            board
          </section>
        </Row>
        <Row className="py-3">
          <Col>
            <Button outline block color="danger">
              Stop
            </Button>
          </Col>
          <Col>
            <Button block color="primary">
              Start
            </Button>
          </Col>
        </Row>
      </Col>
    </Container>
  </div>
);

export default App;
