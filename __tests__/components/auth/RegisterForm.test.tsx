import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../../../src/components/auth/RegisterForm';

describe('RegisterForm', () => {
  const mockRegister = vi.fn();

  beforeEach(() => {
    mockRegister.mockClear();
  });

  it('renders name, email, and password inputs and register button', () => {
    render(<RegisterForm onRegister={mockRegister} error={null} />);
    expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('calls onRegister with name, email, and password on submit', () => {
    render(<RegisterForm onRegister={mockRegister} error={null} />);
    fireEvent.change(screen.getByPlaceholderText(/full name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'mypassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(mockRegister).toHaveBeenCalledWith('jane@example.com', 'mypassword', 'Jane Doe');
  });

  it('displays error message when error prop is set', () => {
    render(<RegisterForm onRegister={mockRegister} error="Email already exists" />);
    expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
  });
});
