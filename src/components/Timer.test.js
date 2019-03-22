import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-dom/extend-expect';
import { render } from 'react-testing-library';

import Timer from './Timer';

it('renders without crashing', () => {
  const component = <Timer initialCount={5} isTicking={false} onZero={() => console.log('zero')} />;
  const div = document.createElement('div');
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders default content', () => {
  const { getByText } = render(<Timer initialCount={30} />);
  expect(getByText('30')).toBeInTheDocument();
});

it('renders custom content with renderTime', () => {
  const { getByText } = render(
    <Timer initialCount={30} renderTime={seconds => <div>{`0000${seconds}`}</div>} />,
  );
  expect(getByText('000030')).toBeInTheDocument();
});
