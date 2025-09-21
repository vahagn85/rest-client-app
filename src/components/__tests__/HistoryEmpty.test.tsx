import { render, screen } from '@/test-utils';
import HistoryEmpty from '@/components/history/HistoryEmpty';

describe('HistoryEmpty component', () => {
  it('renders empty state message and link', () => {
    render(<HistoryEmpty />);

    expect(
      screen.getByRole('heading', {
        name: /you haven't executed any requests yet/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/^try:/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /rest client/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/rest');
  });
});
