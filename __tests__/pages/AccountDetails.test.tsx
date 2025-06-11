import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountDetailsPage from '../../src/pages/AccountDetails';
import { AppProvider } from '../../src//context/AppContext';
import API from '../../src//services/api';

vi.mock('@/services/api');

describe('AccountDetailsPage', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Old Name', email: 'test@example.com' }));
  });

  it('renders form with user data', () => {
    render(<AppProvider><AccountDetailsPage /></AppProvider>);
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Old Name')).toBeInTheDocument();
  });

  it('updates account', async () => {
    (API.put as any).mockResolvedValue({});
    render(<AppProvider><AccountDetailsPage /></AppProvider>);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByText(/update account/i));

    await waitFor(() => {
      expect(screen.getByText(/account updated successfully/i)).toBeInTheDocument();
    });
  });
});

