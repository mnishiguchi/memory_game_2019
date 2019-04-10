import React from 'react';
import 'jest-dom/extend-expect';
import { render } from 'react-testing-library';

import Board, { createShuffledCardPairs } from './Board';

const cards = createShuffledCardPairs(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

it('renders without crashing', () => {
  render(<Board cards={cards} />);
});

describe('notice message', () => {
  it('visible when game is stopped', () => {
    const noticeMessage = 'Welcome to Memory Game';
    const { getByText } = render(
      <Board cards={cards} isPlaying={false} renderNotice={() => <div>{noticeMessage}</div>} />,
    );
    expect(getByText(noticeMessage)).toBeInTheDocument();
  });

  it('hidden when game is playing', () => {
    const noticeMessage = 'Welcome to Memory Game';
    const { getByText } = render(
      <Board cards={cards} isPlaying={true} renderNotice={() => <div>{noticeMessage}</div>} />,
    );
    expect(getByText(noticeMessage)).toBeInTheDocument();
  });
});

describe('createShuffledCardPairs', () => {
  it('returns an array of 16 cards with 8 distinct symbols', () => {
    expect(Array.isArray(cards)).toBe(true);
    expect(cards).toHaveLength(16);

    const symbols = cards.map(card => card.symbol);
    expect([...new Set(symbols)]).toHaveLength(8);
  });
});

describe('card object', () => {
  it('has correct keys', () => {
    const cardKeys = Object.keys(cards[0]);
    expect(cardKeys.sort()).toEqual(['uuid', 'isFaceup', 'isTaken', 'symbol'].sort());
  });
});
