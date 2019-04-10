import React from 'react';
import { render, fireEvent, cleanup, act, waitForDomChange } from 'react-testing-library';
import 'jest-dom/extend-expect';

import App from './App';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('renders without crashing', () => {
  render(<App />);
});

describe('stop-button', () => {
  it('is disabled by default', () => {
    const { getByTestId } = render(<App />);

    const stopButton = getByTestId('stop-button');
    expect(stopButton.disabled).toBe(true);
  });

  it('is enabled when game is started', () => {
    const { getByTestId } = render(<App />);

    const stopButton = getByTestId('stop-button');
    const startButton = getByTestId('start-button');

    // start the game
    fireEvent.click(startButton);
    expect(stopButton.disabled).toBe(false);
  });
});

describe('start-button', () => {
  it('is enabled by default', () => {
    const { getByTestId } = render(<App />);

    const startButton = getByTestId('start-button');
    expect(startButton.disabled).toBe(false);
  });

  it('is disabled when game is stopped', () => {
    const { getByTestId } = render(<App />);

    const stopButton = getByTestId('stop-button');
    const startButton = getByTestId('start-button');

    // start the game
    fireEvent.click(startButton);
    expect(startButton.disabled).toBe(true);

    // stop the game
    fireEvent.click(stopButton);
    expect(startButton.disabled).toBe(false);
  });
});

describe('current-score', () => {
  it('displays default score in correct format', () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId('current-score').textContent).toBe('000000');
  });
});

describe('remaining-time', () => {
  it('displays initial time in correct format', () => {
    const { getByTestId } = render(<App initialCount={123} />);

    expect(getByTestId('remaining-time').textContent).toBe('000123');
  });

  it('counts down once game is started', () => {
    jest.useFakeTimers();

    const { getByTestId } = render(<App initialCount={123} />);

    // start the game
    fireEvent.click(getByTestId('start-button'));

    expect(getByTestId('remaining-time').textContent).toBe('000123');
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('remaining-time').textContent).toBe('000122');
    act(() => jest.advanceTimersByTime(1000));
    expect(getByTestId('remaining-time').textContent).toBe('000121');
  });
});

describe('flipping cards', () => {
  it('flips a clicked card face up', async () => {
    const { container, getByTestId } = render(
      <App symbolList={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']} />,
    );

    const targetSelector = '[data-symbol="A"][data-faceup="false"]';

    // start the game
    fireEvent.click(getByTestId('start-button'));

    // initially 2 facedown
    expect(container.querySelectorAll(targetSelector).length).toBe(2);

    // flip first card
    fireEvent.click(container.querySelector(targetSelector));
    expect(container.querySelectorAll(targetSelector).length).toBe(1);

    // flip second card
    fireEvent.click(container.querySelector(targetSelector));
    expect(container.querySelectorAll(targetSelector).length).toBe(0);
  });
});

// TODO: test for scoring
// I tried using "waitForDomChange", "jest.useFakeTimers()" etc but
// the matched cards won't get updated as "taken".
// Maybe it is because I fire stateUpdaters inside setTimeout callback.
