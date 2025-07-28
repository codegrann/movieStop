import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountDetailsPage from '../../src/pages/AccountDetails';
import { AppProvider } from '../../src/context/AppContext';
import API from '../../src/services/api';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../src/services/api', () => ({
  default: {
    put: vi.fn(),
  },
}));

describe('AccountDetailsPage', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Old Name', email: 'test@example.com' }));
  });

  it('renders form with user data', () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <AccountDetailsPage />
        </AppProvider>
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Old Name')).toBeInTheDocument();
  });

  it('updates account', async () => {
    (API.put as vi.Mock).mockResolvedValue({});
    render(
      <MemoryRouter>
        <AppProvider>
          <AccountDetailsPage />
        </AppProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByText(/update account/i));

    await waitFor(() => {
      expect(API.put).toHaveBeenCalledWith('/user/account', { name: 'New Name', password: '' });
    });
  });
});

