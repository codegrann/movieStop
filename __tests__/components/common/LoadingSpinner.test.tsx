import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../../src/components/common/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the spinner', () => {
    render(<LoadingSpinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});