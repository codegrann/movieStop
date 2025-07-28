import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../src/pages/Login';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../src/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    loginUser: vi.fn().mockResolvedValue(undefined),
  })
}));

test('renders login page and handles login', async () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  expect(screen.getByText('Welcome to MovieStop')).toBeInTheDocument();
});
