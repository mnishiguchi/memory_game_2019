import 'jest-dom/extend-expect';
import { renderHook, act } from 'react-hooks-testing-library';

import useCountdownTimer from './useCountdownTimer';

it('return correct object', () => {
  const { result } = renderHook(() => useCountdownTimer({ initialCount: 99 }));

  const { count, setCount, clearCount, startTimer, stopTimer } = result.current;
  expect(count).toBe(99);
  expect(typeof setCount).toBe('function');
  expect(typeof clearCount).toBe('function');
  expect(typeof startTimer).toBe('function');
  expect(typeof stopTimer).toBe('function');
});

describe('setCount and clearCount', () => {
  it('updates count', () => {
    const { result } = renderHook(() => useCountdownTimer({ initialCount: 99 }));

    act(() => result.current.setCount(11));
    expect(result.current.count).toBe(11);

    act(() => result.current.clearCount());
    expect(result.current.count).toBe(99);
  });
});

describe('onZero', () => {
  it('is invoked when count turns 0', () => {
    jest.useFakeTimers();

    const onZeroCallback = jest.fn();

    const { result } = renderHook(() =>
      useCountdownTimer({ initialCount: 1, onZero: onZeroCallback }),
    );

    result.current.startTimer();

    act(() => jest.advanceTimersByTime(1000));
    expect(onZeroCallback).toHaveBeenCalledTimes(1);
  });
});
