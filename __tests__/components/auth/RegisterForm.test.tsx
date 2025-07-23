import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../../../src/components/auth/RegisterForm';

describe('RegisterForm', () => {
  const mockRegister = vi.fn();
  const defaultProps = {
    onRegister: mockRegister,
    error: null,
    loading: false,
  };

  const fillForm = (password: string, confirm: string) => {
    fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } });
    fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: confirm } });
  };

  beforeEach(() => {
    mockRegister.mockClear();
  });

  it('calls onRegister with valid inputs', () => {
    render(<RegisterForm {...defaultProps} />);
    fillForm('Password123!', 'Password123!');
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(mockRegister).toHaveBeenCalledWith('jane@example.com', 'Password123!', 'Jane Doe');
  });

  it('does not call onRegister and shows an error if passwords do not match', async () => {
    render(<RegisterForm {...defaultProps} />);
    fillForm('Password123!', 'Password123wrong');
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
    expect(mockRegister).not.toHaveBeenCalled();
    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
  });

  describe('Password Validation', () => {
    const testPasswordValidation = async (password: string, expectedError: RegExp) => {
      render(<RegisterForm {...defaultProps} />);
      fillForm(password, password);
      fireEvent.click(screen.getByRole('button', { name: /register/i }));
      
      expect(mockRegister).not.toHaveBeenCalled();
      expect(await screen.findByText(expectedError)).toBeInTheDocument();
    };

    it('fails if password is less than 8 characters', async () => {
      await testPasswordValidation('Pass1!', /password must be at least 8 characters long/i);
    });

    it('fails if password does not contain an uppercase letter', async () => {
      await testPasswordValidation('password123!', /password must contain at least one uppercase letter/i);
    });

    it('fails if password does not contain a lowercase letter', async () => {
      await testPasswordValidation('PASSWORD123!', /password must contain at least one lowercase letter/i);
    });

    it('fails if password does not contain a number', async () => {
      await testPasswordValidation('Password!', /password must contain at least one number/i);
    });

    it('fails if password does not contain a special character', async () => {
      await testPasswordValidation('Password123', /password must contain at least one special character/i);
    });
  });

  it('displays a server error message when error prop is set', () => {
    render(<RegisterForm {...defaultProps} error="Email already exists" />);
    expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
  });
});

