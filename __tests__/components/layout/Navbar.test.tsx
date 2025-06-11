import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../../src/components/layout/Navbar';
import * as useAuthModule from '@/hooks/useAuth';

describe('Navbar', () => {
  const logoutMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock('@/hooks/useAuth', () => ({
      useAuth: () => ({ user: { name: 'TestUser' }, logoutUser: logoutMock }),
    }));
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useNavigate: () => navigateMock,
      };
    });
  });

  it('renders logo and greets user', () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    expect(screen.getByText('MovieStop')).toBeInTheDocument();
    expect(screen.getByText(/Hello, TestUser/i)).toBeInTheDocument();
  });

  it('navigates when clicking logo', () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText('MovieStop'));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('shows sidebar when hamburger is clicked', () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const toggleBtn = screen.getByLabelText(/toggle menu/i);
    fireEvent.click(toggleBtn);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('calls logout on button click', () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);
    expect(logoutMock).toHaveBeenCalled();
  });
});
