import React from 'react';

// private constants (implementation detail)
const GAME_STARTED = 'GAME_STARTED';
const GAME_COMPLETED = 'GAME_COMPLETED';
const CARDS_UPDATED = 'CARDS_UPDATED';
const SCORE_UPDATED = 'SCORE_UPDATED';
const FIRST_CARD_SELECTED = 'FIRST_CARD_SELECTED';
const FIRST_CARD_CLEARED = 'FIRST_CARD_CLEARED';
const JUDGE_STARTED = 'JUDGE_STARTED';
const JUDGE_COMPLETED = 'JUDGE_COMPLETED';

// private reducer (implementation detail)
const appReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GAME_STARTED:
      if (!Array.isArray(payload.cards)) throw new Error();
      return {
        ...state,
        cards: payload.cards,
        score: 0,
        isPlaying: true,
        isCompleted: false,
      };
    case GAME_COMPLETED:
      return {
        ...state,
        isPlaying: false,
        isCompleted: true,
      };
    case CARDS_UPDATED:
      if (!Array.isArray(payload.cards)) throw new Error();
      return {
        ...state,
        cards: payload.cards,
      };
    case SCORE_UPDATED:
      if (!payload.score && payload.score !== 0) throw new Error();
      return {
        ...state,
        score: payload.score,
      };
    case FIRST_CARD_SELECTED:
      if (!payload.card) throw new Error();
      return {
        ...state,
        firstCard: payload.card,
      };
    case FIRST_CARD_CLEARED:
      return {
        ...state,
        firstCard: null,
      };
    case JUDGE_STARTED:
      return {
        ...state,
        isJudging: true,
      };
    case JUDGE_COMPLETED:
      return {
        ...state,
        isJudging: false,
        firstCard: null,
      };
    default:
      throw new Error();
  }
};

// returns a public store object that contains state and action dispatchers
export const useAppStore = initialState => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  // The object nesting level is flattened so that we can debug easily in the devtool.
  return {
    ...state,
    updateCards(cards) {
      dispatch({ type: CARDS_UPDATED, payload: { cards } });
    },
    updateScore(score) {
      dispatch({ type: SCORE_UPDATED, payload: { score } });
    },
    startGame(cards) {
      dispatch({ type: GAME_STARTED, payload: { cards } });
    },
    endGame() {
      dispatch({ type: GAME_COMPLETED, payload: {} });
    },
    startJudging() {
      dispatch({ type: JUDGE_STARTED, payload: {} });
    },
    endJudging() {
      dispatch({ type: JUDGE_COMPLETED, payload: {} });
    },
    selectFirstCard(card) {
      dispatch({ type: FIRST_CARD_SELECTED, payload: { card } });
    },
    clearFirstCard() {
      dispatch({ type: FIRST_CARD_CLEARED, payload: {} });
    },
  };
};
