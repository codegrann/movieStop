import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../../src/components/auth/LoginForm';

describe('LoginForm', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    mockLogin.mockClear();
  });

  it('renders email and password inputs and login button', () => {
    render(<LoginForm onLogin={mockLogin} error={null} />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('calls onLogin with email and password on submit', () => {
    render(<LoginForm onLogin={mockLogin} error={null} />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'secret123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'secret123');
  });

  it('displays error message when error prop is set', () => {
    render(<LoginForm onLogin={mockLogin} error="Invalid credentials" />);
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
