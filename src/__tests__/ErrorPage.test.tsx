import { render, screen } from '@/test-utils';
import user from '@testing-library/user-event';
import Error from '@/app/error';

describe('Error component', () => {
  it('renders title and reset button', async () => {
    const resetMock = vi.fn();

    render(<Error reset={resetMock} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Try again' });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(resetMock).toHaveBeenCalled();
  });
});
