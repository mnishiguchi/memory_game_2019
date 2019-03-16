import React, { useState, useRef } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Timer from "./Timer";
import Header from "./AppHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Manages game plays
const App = () => {
  // true if game is being played
  const [isPlaying, setIsPlaying] = useState(false);

  // true if game is completed
  const [isCompleted, setIsCompleted] = useState(false);

  // ref to call Timer's function
  const timerRef = useRef();

  const startTimer = () => {
    if (isPlaying) return;

    if (isCompleted) {
      timerRef.current.resetCount();
      setIsCompleted(false);
    }

    setIsPlaying(true);
    toast.info("started");
  };

  const stopTimer = () => {
    if (!isPlaying || isCompleted) return;

    setIsPlaying(false);
    toast.info("stopped");
  };

  const onZero = () => {
    setIsCompleted(true);
    setIsPlaying(false);
    toast.info("zero");
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <Header />

      <Container className="my-3">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Row className="py-3">
            <Col>100 points</Col>
            <Col>
              <Timer
                ref={timerRef}
                initialCount={5}
                onZero={onZero}
                isTicking={isPlaying}
              />
            </Col>
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
              <Button
                outline
                block
                color="danger"
                onClick={stopTimer}
                disabled={!isPlaying}
              >
                Stop
              </Button>
            </Col>
            <Col>
              <Button
                block
                color="primary"
                onClick={startTimer}
                disabled={isPlaying}
              >
                Start
              </Button>
            </Col>
          </Row>
        </Col>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </Container>
    </div>
  );
};

export default App;
