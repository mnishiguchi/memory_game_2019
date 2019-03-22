import { useState } from 'react';

import useInterval from './useInterval';

const noop = () => {};

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useCountdownTimer({ initialCount = 5, isTicking = false, onZero = noop }) {
  const [count, setCount] = useState(initialCount);

  useInterval(() => {
    if (isTicking) {
      if (count > 1) {
        setCount(count - 1);
      } else if (count === 1) {
        setCount(0);
        if (onZero) {
          onZero();
        }
      }
    }
  }, 1000);

  return {
    count,
    setCount,
    resetCount: () => setCount(initialCount),
  };
}

export default useCountdownTimer;
