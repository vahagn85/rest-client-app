import { render, screen } from '@/test-utils';
import VariablesPage from '@/app/(protected)/variables/page';

vi.mock('@/app/(protected)/variables/VariablesPageClient', () => ({
  default: () => <div>Mock VariablesPageClient</div>,
}));

describe('VariablesPage', () => {
  it('renders VariablesPageClient', () => {
    render(<VariablesPage />);
    expect(screen.getByText('Mock VariablesPageClient')).toBeInTheDocument();
  });
});
