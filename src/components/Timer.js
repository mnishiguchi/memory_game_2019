import { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import useCountdownTimer from '../lib/useCountdownTimer';

// A count-down timer
const Timer = forwardRef(({ initialCount = 5, isTicking = false, onZero, renderTime }, ref) => {
  const { count, setCount, resetCount } = useCountdownTimer({
    initialCount,
    isTicking,
    onZero,
  });

  // expose public functions
  // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
  useImperativeHandle(ref, () => ({
    setCount,
    resetCount,
    count: () => count,
  }));

  return renderTime ? renderTime(count) : count;
});

Timer.propTypes = {
  initialCount: PropTypes.number,
  isTicking: PropTypes.bool,
  onZero: PropTypes.func,
  renderTime: PropTypes.func,
};

export default Timer;
