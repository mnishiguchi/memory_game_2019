import React, { useState } from 'react';
import { toast } from 'react-toastify';

import useCountdownTimer from '../lib/useCountdownTimer';
import AppLayout from './AppLayout';
import Board, { initialcards, createCards } from './Board';
import './App.css';

// Top level component of the memory game app. Manages game plays.
const App = ({ initialCount = 30 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isJugding, setIsJugding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(true);
  const [cards, setCards] = useState(initialcards);
  const [score, setScore] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const { count, resetCount } = useCountdownTimer({
    initialCount,
    isTicking: isPlaying,
    onZero: () => {
      setIsPlaying(false);
      toast.info(`Time is up! Your score was ${score}.`, { autoClose: 10000 });
      setIsCompleted(true);
    },
  });

  const startGame = () => {
    if (isPlaying) return;

    setIsCompleted(false);
    setCards(createCards);
    setScore(0);
    resetCount();
    setIsPlaying(true);
    toast.info('Game is started. Enjoy!');
  };

  const stopGame = () => {
    if (!isPlaying || isCompleted) return;

    setIsPlaying(false);
    setIsCompleted(true);
    toast.info(`Game is stopped. Your score was ${score}`);
  };

  const flipCardByUUID = (uuid, { isFaceup }) =>
    setCards(prev => prev.map(card => (card.uuid === uuid ? { ...card, isFaceup } : card)));

  const flipCardFaceup = ({ uuid }) => flipCardByUUID(uuid, { isFaceup: true });

  const flipCardFacedown = ({ uuid }) => flipCardByUUID(uuid, { isFaceup: false });

  const setSymbolTaken = symbol => {
    setCards(prev =>
      prev.map(card =>
        card.symbol === symbol ? { ...card, isTaken: true, isFaceup: true } : card,
      ),
    );
  };

  const judgePair = (firstCard, secondCard) => {
    const isMatched = firstCard.symbol === secondCard.symbol;
    const takenCards = cards.filter(x => x.isTaken);
    const isFinalPair = cards.length - takenCards.length === 2;
    // delay the process so that it is human-visible
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ isMatched, isFinalPair }), 400);
    });
  };

  const onComplete = () => {
    setIsPlaying(false);
    const bonus = count * 100;
    const finalScore = score + bonus;
    toast.success(`Bonus score for completion: ${bonus}`, { autoClose: 5000 });
    setScore(finalScore);
    setTimeout(
      () => toast.success(`Congratulations! Your score was ${finalScore}.`, { autoClose: 10000 }),
      600,
    );
    resetCount();
    setIsCompleted(true);
  };

  const onCardClicked = clickedCard => {
    if (!isPlaying) return;
    if (isJugding) return;

    flipCardFaceup(clickedCard);

    // first time
    if (!firstCard) {
      setFirstCard(clickedCard);
      return;
    }

    // reject the same card as the first one
    if (firstCard.uuid === clickedCard.uuid) return;

    // second time
    setIsJugding(true);
    judgePair(firstCard, clickedCard).then(({ isMatched, isFinalPair }) => {
      if (isMatched) {
        toast.success('Matched');
        setScore(prev => prev + count);
        setSymbolTaken(clickedCard.symbol);

        if (isFinalPair) {
          onComplete();
        }
      } else {
        flipCardFacedown(firstCard);
        flipCardFacedown(clickedCard);
      }

      setFirstCard(null);
      setIsJugding(false);
    });
  };

  return (
    <AppLayout
      isPlaying={isPlaying}
      score={score}
      time={count}
      onStart={startGame}
      onStop={stopGame}
      renderBoard={() => (
        <Board
          cards={cards}
          onCardClicked={onCardClicked}
          isPlaying={isPlaying}
          isCompleted={isCompleted}
        />
      )}
    />
  );
};

export default App;
