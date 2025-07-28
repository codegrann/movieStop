import { renderHook, act } from '@testing-library/react';
import { AppProvider } from '../../src/context/AppContext';
import { useAuth } from '../../src/hooks/useAuth';
import authService from '../../src/services/authService';

vi.mock('../../src/services/authService', () => ({
  default: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

vi.mock('../../src/services/api', () => ({
  getGenres: vi.fn().mockResolvedValue({ data: [] }),
}));

const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', favorites: [] };
const mockToken = 'mock-token';

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('logs in a user', async () => {
    (authService.login as vi.Mock).mockResolvedValue({ token: mockToken, user: mockUser });

    const { result } = renderHook(() => useAuth(), { wrapper: AppProvider });

    await act(async () => {
      await result.current.loginUser('test@example.com', 'password');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toEqual(mockToken);
  });

  it('registers a user', async () => {
    (authService.register as vi.Mock).mockResolvedValue({ token: mockToken, user: mockUser });

    const { result } = renderHook(() => useAuth(), { wrapper: AppProvider });

    await act(async () => {
      await result.current.registerUser('test@example.com', 'password', 'Test User');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toEqual(mockToken);
  });

  it('logs out a user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AppProvider });

    act(() => {
      result.current.loginWithToken(mockToken, mockUser);
    });

    act(() => {
      result.current.logoutUser();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
});
