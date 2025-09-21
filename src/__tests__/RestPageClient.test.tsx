import { render, screen, act } from '@/test-utils';
import RestPageClient from '@/app/(protected)/rest/RestPageClient';

vi.mock('@/components/restClient/RestClient', () => ({
  default: () => <div>Mock RestClient</div>,
}));

describe('RestPageClient', () => {
  it('renders the RestClient component', async () => {
    await act(async () => {
      render(<RestPageClient />);
    });

    expect(screen.getByText('Mock RestClient')).toBeInTheDocument();
  });
});
