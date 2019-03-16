import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import useInterval from "../lib/useInterval";

// A count-down timer
const Timer = forwardRef(({ initialCount, isTicking, onZero }, ref) => {
  const [count, setCount] = useState(initialCount);

  useInterval(() => {
    if (isTicking) {
      if (count > 1) {
        setCount(count - 1);
      } else if (count === 1) {
        setCount(0);
        onZero();
      }
    }
  }, 1000);

  // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
  useImperativeHandle(ref, () => ({
    resetCount: () => setCount(initialCount),
  }));

  return <div> {`${count} seconds`} </div>;
});

Timer.propTypes = {
  initialCount: PropTypes.number.isRequired,
  isTicking: PropTypes.bool.isRequired,
  onZero: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
};

Timer.defaultProps = {
  initialCount: 5,
  isTicking: false,
  onZero: () => console.log("zero"),
  reset: false,
};

export default Timer;
