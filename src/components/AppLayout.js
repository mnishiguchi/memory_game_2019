import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import padNumber from '../lib/padNumber';
import logo from '../assets/logo.png';
import 'react-toastify/dist/ReactToastify.css';

// Build a Library to Reference Icons Throughout Your App
// https://github.com/FortAwesome/react-fontawesome
library.add(faClock);

const AppLayout = ({ isPlaying, score, time, renderBoard, onStart, onStop }) => {
  return (
    <div style={{ backgroundColor: '#f8f9fa', width: '100vw', height: '100vh' }}>
      <Col sm="12" md={{ size: 6, offset: 3 }} style={{ padding: 0 }}>
        <Card>
          <CardBody>
            <Row
              style={{
                textAlign: 'center',
              }}
            >
              <Col
                style={{
                  position: 'relative',
                }}
              >
                <code
                  className="p-1"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    fontSize: '100%',
                  }}
                >
                  <span data-testid="current-score">{padNumber(score, 6)}</span>
                </code>
              </Col>
              <Col>
                <a href="http://mnishiguchi.com">
                  <img
                    src={logo}
                    className="AppHeader__logo"
                    alt="logo"
                    style={{
                      animationPlayState: isPlaying ? 'running' : 'paused',
                    }}
                  />
                </a>
              </Col>
              <Col
                style={{
                  position: 'relative',
                }}
              >
                <code
                  className="p-1"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    fontSize: '100%',
                  }}
                >
                  <FontAwesomeIcon icon={['fas', 'clock']} fixedWidth={true} />
                  <span data-testid="remaining-time">{padNumber(time, 6)}</span>
                </code>
              </Col>
            </Row>
          </CardBody>

          {renderBoard()}

          <CardBody>
            <Row className="py-3">
              <Col>
                <Button
                  outline
                  block
                  color="danger"
                  onClick={onStop}
                  disabled={!isPlaying}
                  data-testid="stop-button"
                >
                  Stop
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  color="primary"
                  onClick={onStart}
                  disabled={isPlaying}
                  data-testid="start-button"
                >
                  Start
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>

      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AppLayout;
