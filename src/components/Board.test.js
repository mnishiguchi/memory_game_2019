import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-dom/extend-expect';
import { render } from 'react-testing-library';

import Board, { createCards } from './Board';

it('renders without crashing', () => {
  const component = <Board />;
  const div = document.createElement('div');
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders notice when game is not playing', () => {
  const noticeMessage = 'Welcome to Memory Game';
  const { getByText } = render(
    <Board isPlaying={false} renderNotice={() => <div>{noticeMessage}</div>} />,
  );
  expect(getByText(noticeMessage)).toBeInTheDocument();
});

it('does not render notice when game is playing', () => {
  const noticeMessage = 'Welcome to Memory Game';
  const { getByText } = render(
    <Board isPlaying={true} renderNotice={() => <div>{noticeMessage}</div>} />,
  );
  expect(getByText(noticeMessage)).toBeInTheDocument();
});

describe('createCards', () => {
  it('returns an array of 16 cards with 8 distinct symbols', () => {
    const cards = createCards();
    const symbols = cards.map(card => card.symbol);
    expect(Array.isArray(cards)).toBe(true);
    expect(cards).toHaveLength(16);
    expect([...new Set(symbols)]).toHaveLength(8);
  });
});

describe('Card object', () => {
  it('has correct keys', () => {
    const card = createCards()[0];
    expect(Object.keys(card).sort()).toEqual(['uuid', 'isFaceup', 'isTaken', 'symbol'].sort());
  });
});
