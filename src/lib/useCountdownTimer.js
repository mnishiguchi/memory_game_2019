import { useState } from 'react';

import useInterval from './useInterval';

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function({ initialCount = 5, onZero = () => {} }) {
  const [count, setCount] = useState(initialCount);
  const [isTicking, updateIsTicking] = useState(false);

  useInterval(() => {
    if (isTicking) {
      if (count > 1) {
        setCount(count - 1);
      } else if (count === 1) {
        onZero();
        setCount(0);
      }
    }
  }, 1000);

  return {
    count,
    setCount,
    clearCount: () => setCount(initialCount),
    startTimer: () => updateIsTicking(true),
    stopTimer: () => updateIsTicking(false),
  };
}
