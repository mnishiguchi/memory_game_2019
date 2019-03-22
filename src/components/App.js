import React, { useState, useRef } from 'react';
import { Row, Col, Button, Card, CardBody } from 'reactstrap';
import { toast } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from '../assets/logo.png';
import padNumber from '../lib/padNumber';
import AppLayout from './AppLayout';
import Timer from './Timer';
import Board, { createCards } from './Board';
import './App.css';

// Build a Library to Reference Icons Throughout Your App
// https://github.com/FortAwesome/react-fontawesome
library.add(faClock);

const initialcards = createCards().map(card => ({ ...card, isTaken: true }));

// Top level component of the memory game app. Manages game plays.
const App = ({ initialCount = 30 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [cards, setCards] = useState(initialcards);
  const [score, setScore] = useState(0);
  const [firstCard, setFirstCard] = useState(null);

  // ref to call Timer's functions
  const timerRef = useRef();

  const startGame = () => {
    if (isPlaying) return;

    setIsCompleted(false);
    setCards(createCards);
    setScore(0);
    resetTimer();
    setIsPlaying(true);
    toast.info('Game is started. Enjoy!');
  };

  const stopGame = () => {
    if (!isPlaying || isCompleted) return;

    setIsCompleted(true);
    setIsPlaying(false);
    toast.info(`Game is stopped. Your score was ${score}`);
  };

  const currentTime = () => timerRef.current.count();

  const resetTimer = () => timerRef.current.resetCount();

  // determines whether or not a card pair matches and update the state of the cards
  const judgePair = (card, otherCard) => {
    const isMatched = card.symbol === otherCard.symbol && card.uuid !== otherCard.uuid;
    if (isMatched) toast.success('Matched');

    // delay animation so that it is human-visible
    setTimeout(() => {
      if (isMatched) {
        setScore(score + currentTime());
        const isFinalPair = cards.filter(card => card.isTaken).length === cards.length - 2;
        if (isFinalPair) {
          onComplete();
        }
        setSymbolTaken(card.symbol);
      } else {
        flipCardFacedown(card);
        flipCardFacedown(otherCard);
      }
    }, 400);
  };

  const flipCard = ({ uuid }, isFaceup) =>
    setCards(cards.map(card => (card.uuid === uuid ? { ...card, isFaceup } : card)));

  const flipCardFaceup = card => flipCard(card, true);

  const flipCardFacedown = card => flipCard(card, false);

  const setSymbolTaken = symbol =>
    setCards(
      cards.map(card =>
        card.symbol === symbol ? { ...card, isTaken: true, isFaceup: true } : card,
      ),
    );

  const onComplete = () => {
    const bonus = currentTime() * 100;
    const finalScore = score + bonus;
    toast.success(`Bonus score for completion: ${bonus}`, { autoClose: 5000 });
    setScore(finalScore);
    setTimeout(
      () => toast.success(`Congratulations! Your score was ${finalScore}.`, { autoClose: 10000 }),
      600,
    );
    resetTimer();
    setIsCompleted(true);
    setIsPlaying(false);
  };

  const onZero = () => {
    toast.info(`Time is up! Your score was ${score}.`, { autoClose: 10000 });
    setIsCompleted(true);
    setIsPlaying(false);
  };

  const onCardClicked = clickedCard => {
    if (!isPlaying) return;

    flipCardFaceup(clickedCard);

    if (!firstCard) {
      setFirstCard(clickedCard);
      return;
    }

    if (firstCard.uuid === clickedCard.uuid) return;

    judgePair(clickedCard, firstCard);
    setFirstCard(null);
  };

  return (
    <AppLayout>
      <Card>
        <CardBody>
          <Row style={{ textAlign: 'center' }}>
            <Col style={{ position: 'relative' }}>
              <code
                className="p-1"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  fontSize: '100%',
                }}
              >
                {padNumber(score, 6)}
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
            <Col style={{ position: 'relative' }}>
              <Timer
                ref={timerRef}
                initialCount={initialCount}
                onZero={onZero}
                isTicking={isPlaying}
                renderTime={seconds => (
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
                    {padNumber(seconds, 6)}
                  </code>
                )}
              />
            </Col>
          </Row>
        </CardBody>

        <Board cards={cards} onCardClicked={onCardClicked} isPlaying={isPlaying} />

        <CardBody>
          <Row className="py-3">
            <Col>
              <Button outline block color="danger" onClick={stopGame} disabled={!isPlaying}>
                Stop
              </Button>
            </Col>
            <Col>
              <Button block color="primary" onClick={startGame} disabled={isPlaying}>
                Start
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </AppLayout>
  );
};

export default App;
