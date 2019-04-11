import React from 'react';
import { toast } from 'react-toastify';

import availableSymbols from '../data/availableSymbols';
import useCountdownTimer from '../lib/useCountdownTimer';
import { useAppStore } from '../store/appStore';
import AppLayout from './AppLayout';
import Board, { createShuffledCardPairs } from './Board';
import './App.css';

// public context that is used to share state with child components
export const AppContext = React.createContext({});

// Top level component of the memory game app. Manages game plays.
// In order to make test easy, we inject symbols from outside of the component.
const App = ({ initialCount = 30, symbolList = availableSymbols }) => {
  const dealCards = () => createShuffledCardPairs(symbolList);

  // initialize app state
  const initialState = {
    isPlaying: false,
    isCompleted: false,
    isJudging: false,
    cards: dealCards().map(card => ({ ...card, isTaken: true })),
    firstCard: null,
    score: 0,
  };
  const appStore = useAppStore(initialState);
  const {
    isPlaying,
    isCompleted,
    isJudging,
    cards,
    firstCard,
    score,
    updateCards,
    updateScore,
    startGame,
    endGame,
    startJudging,
    endJudging,
    selectFirstCard,
  } = appStore;

  // initialize timer
  const { count, clearCount, startTimer, stopTimer } = useCountdownTimer({
    initialCount,
    onZero: () => {
      endGame();
      toast.info(`Time is up! Your score was ${score}.`, { autoClose: 10000 });
    },
  });

  const flipCards = (uuids, { isFaceup }) => {
    const updatedCards = cards.map(card =>
      uuids.includes(card.uuid) ? { ...card, isFaceup } : card,
    );

    updateCards(updatedCards);
  };

  const flipCard = (uuid, { isFaceup }) => flipCards([uuid], { isFaceup });

  const flipCardFaceup = ({ uuid }) => flipCard(uuid, { isFaceup: true });

  const setSymbolTaken = symbol => {
    const updatedCards = cards.map(card =>
      card.symbol === symbol ? { ...card, isTaken: true, isFaceup: true } : card,
    );

    updateCards(updatedCards);
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

  const onStart = () => {
    if (isPlaying) return;

    const newCards = dealCards();
    startGame(newCards);
    clearCount();
    startTimer();
    toast.info('Game is started. Enjoy!');
  };

  const onStop = () => {
    if (!isPlaying || isCompleted) return;

    endGame();
    stopTimer();
    toast.info(`Game is stopped. Your score was ${score}`);
  };

  const onComplete = () => {
    const bonus = count * 100;
    const finalScore = score + bonus;
    toast.success(`Bonus score for completion: ${bonus}`, { autoClose: 5000 });
    updateScore(finalScore);
    setTimeout(
      () => toast.success(`Congratulations! Your score was ${finalScore}.`, { autoClose: 10000 }),
      600,
    );
    clearCount();
    endGame();
  };

  const onCardClicked = async clickedCard => {
    if (!isPlaying) return;
    if (isJudging) return;

    flipCardFaceup(clickedCard);

    // first time
    if (!firstCard) {
      selectFirstCard(clickedCard);
      return;
    }

    // reject the same card as the first one
    if (firstCard.uuid === clickedCard.uuid) return;

    // second time
    startJudging();
    await judgePair(firstCard, clickedCard).then(({ isMatched, isFinalPair }) => {
      if (isMatched) {
        const updatedScore = score + count;
        toast.success(`Matched: ${updatedScore}`);
        updateScore(updatedScore);
        setSymbolTaken(clickedCard.symbol);
        isFinalPair && onComplete();
      } else {
        flipCards([firstCard.uuid, clickedCard.uuid], { isFaceup: false });
      }
    });
    endJudging();
  };

  return (
    <AppContext.Provider value={{ ...appStore, count }}>
      <AppLayout onStart={onStart} onStop={onStop}>
        <Board
          cards={cards}
          onCardClicked={onCardClicked}
          isPlaying={isPlaying}
          isCompleted={isCompleted}
        />
      </AppLayout>
    </AppContext.Provider>
  );
};

export default App;
