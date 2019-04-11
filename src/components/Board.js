import React from 'react';
import PropTypes from 'prop-types';
import * as shortid from 'shortid';

import shuffleArray from '../lib/shuffleArray';

const noop = () => {};

const cardBackgroundColor = card => {
  if (card.isTaken) {
    return '#28a745';
  }
  if (card.isFaceup) {
    return '#f8f9fa';
  }
  return '#6d757d';
};

const cardColor = card => {
  if (card.isTaken) {
    return '#fff';
  }
  if (card.isFaceup) {
    return '#575d64';
  }
  return '#575d64';
};

export const createShuffledCardPairs = (symbolList, length = 16) => {
  if (!symbolList) throw new Error('symbolList must be provided');
  const halfLength = length / 2;
  if (symbolList.length < halfLength) {
    throw new Error(`symbolList must be longer than ${halfLength}`);
  }

  const pickedSymbols = shuffleArray(symbolList).slice(0, halfLength);
  const symbolPairs = [...pickedSymbols, ...pickedSymbols.slice(0)];
  const cards = symbolPairs.map(symbol => ({
    uuid: shortid.generate(),
    isFaceup: false,
    isTaken: false,
    symbol,
  }));
  return shuffleArray(cards);
};

const Board = ({ cards = [], isPlaying = false, onCardClicked = noop, renderNotice = noop }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '300px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gridTemplateRows: '90px 90px 90px 90px',
        gridGap: '1px 1px',
        padding: '1px',
        textAlign: 'center',
        backgroundColor: '#ddd',
      }}
    >
      {!isPlaying ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9,
            backgroundColor: 'rgba(0,0,0,.6)',
            color: 'white',
          }}
        >
          {renderNotice ? renderNotice() : <span>Memory Game</span>}
        </div>
      ) : (
        ''
      )}
      {cards.map(card => (
        <div
          key={card.uuid}
          data-symbol={card.symbol}
          data-faceup={!!card.isFaceup}
          data-taken={!!card.isTaken}
          style={{
            border: '1px solid #999',
            backgroundColor: cardBackgroundColor(card),
            color: cardColor(card),
            fontSize: '4rem',
            lineHeight: '90px',
          }}
          onClick={() => onCardClicked(card)}
        >
          {card.isFaceup || card.isTaken ? card.symbol : ''}
        </div>
      ))}
    </div>
  );
};

Board.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      isFaceup: PropTypes.bool.isRequired,
      isTaken: PropTypes.bool.isRequired,
      symbol: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isPlaying: PropTypes.bool,
  renderNotice: PropTypes.func,
  onCardClicked: PropTypes.func,
};

export default Board;
