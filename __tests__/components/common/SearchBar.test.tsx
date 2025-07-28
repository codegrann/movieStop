import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../../../src/components/common/SearchBar';

describe('SearchBar', () => {
  vi.useFakeTimers(); // control debounce

  const mockSearch = vi.fn();

  beforeEach(() => {
    mockSearch.mockClear();
  });

  it('renders input with placeholder', () => {
    render(<SearchBar onSearch={mockSearch} />);
    expect(screen.getByPlaceholderText(/search movies/i)).toBeInTheDocument();
  });

  it('calls onSearch with debounced input', async () => {
    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText(/search movies/i);

    fireEvent.change(input, { target: { value: 'batman' } });

    vi.advanceTimersByTime(500);

    expect(mockSearch).toHaveBeenCalledWith('batman');
  });

  it('cancels previous timer when input changes rapidly', () => {
    render(<SearchBar onSearch={mockSearch} />);
    const input = screen.getByPlaceholderText(/search movies/i);

    fireEvent.change(input, { target: { value: 'b' } });
    fireEvent.change(input, { target: { value: 'ba' } });
    fireEvent.change(input, { target: { value: 'bat' } });

    vi.advanceTimersByTime(500);

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith('bat');
  });
});
