import { render, screen, waitFor } from '@testing-library/react';
import { AppProvider, AppContext } from '../../src/context/AppContext';
import { useContext } from 'react';

const TestComponent = () => {
  const { user, token, login, logout } = useContext(AppContext);

  return (
    <div>
      <div>Token: {token}</div>
      <div>User: {user?.name || 'None'}</div>
      <button onClick={() => login('abc123', { id: '1', name: 'John', email: 'john@example.com' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AppContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default values', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    expect(screen.getByText(/Token:/)).toHaveTextContent('Token:');
    expect(screen.getByText(/User:/)).toHaveTextContent('User: None');
  });

  it('updates user and token on login', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    screen.getByText('Login').click();
    await waitFor(() => {
      expect(screen.getByText(/Token:/)).toHaveTextContent('abc123');
      expect(screen.getByText(/User:/)).toHaveTextContent('John');
    });
  });

  it('clears user and token on logout', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );
    screen.getByText('Login').click();
    await waitFor(() => screen.getByText('Logout').click());
    await waitFor(() => {
      expect(screen.getByText(/User:/)).toHaveTextContent('None');
      expect(screen.getByText(/Token:/)).toHaveTextContent('Token:');
    });
  });
});
