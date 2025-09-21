import { render, screen } from '@/test-utils';

import RestPage from '@/app/(protected)/rest/[[...rest]]/page';

vi.mock('@/app/(protected)/rest/RestPageClient', () => ({
  default: () => <div>Mock RestPageClient</div>,
}));

describe('RestPage', () => {
  it('renders RestPageClient', () => {
    render(<RestPage />);
    expect(screen.getByText('Mock RestPageClient')).toBeInTheDocument();
  });
});
