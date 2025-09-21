import { render, screen } from '@/test-utils';
import NotFound from '@/app/not-found';

describe('NotFound page', () => {
  it('renders 404 heading and translated message', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
