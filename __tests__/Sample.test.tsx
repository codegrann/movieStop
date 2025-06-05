import { render, screen } from '@testing-library/react';
import React from 'react';

function Sample() {
  return <h1>Hello Test</h1>;
}

test('renders greeting', () => {
  render(<Sample />);
  expect(screen.getByText(/hello test/i)).toBeInTheDocument();
});
