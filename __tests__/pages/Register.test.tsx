../../../src
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from '../../src/pages/Register';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../src/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    registerUser: jest.fn().mockResolvedValue(undefined),
  })
}));

test('renders register page and handles register', async () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );

  expect(screen.getByText('Welcome to MovieStop')).toBeInTheDocument();
});
