import React from 'react';
import 'jest-dom/extend-expect';
import { render } from 'react-testing-library';
import { renderHook, act } from 'react-hooks-testing-library';

import useCountdownTimer from './useCountdownTimer';

it('return correct object', () => {
  const { result } = renderHook(() =>
    useCountdownTimer({
      initialCount: 99,
    }),
  );

  const { count, setCount, resetCount } = result.current;

  expect(count).toBe(99);
  expect(typeof setCount).toBe('function');
  expect(typeof resetCount).toBe('function');
});

test('count', () => {
  const { result } = renderHook(() =>
    useCountdownTimer({
      initialCount: 99,
    }),
  );

  expect(result.current.count).toBe(99);
});

test('setCount and resetCount', () => {
  const { result } = renderHook(() =>
    useCountdownTimer({
      initialCount: 99,
    }),
  );

  act(() => result.current.setCount(11));
  expect(result.current.count).toBe(11);

  act(() => result.current.resetCount());
  expect(result.current.count).toBe(99);
});

const TestComponent = ({ initialCount = 3, isTicking = false, onZero = () => {} }) => {
  const { count } = useCountdownTimer({
    initialCount,
    isTicking,
    onZero,
  });

  return <div>{count}</div>;
};

describe('onZero', () => {
  it('is invoked with count turns 0', () => {
    jest.useFakeTimers();

    const onZeroCallback = jest.fn();

    render(<TestComponent initialCount={1} isTicking={true} onZero={onZeroCallback} />);

    act(() => jest.advanceTimersByTime(1000));
    expect(onZeroCallback).toHaveBeenCalledTimes(1);
  });
});
