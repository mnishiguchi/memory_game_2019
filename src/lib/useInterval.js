import React from 'react';

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  });

  React.useEffect(() => {
    const tick = () => savedCallback.current();

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
