import { render, screen } from '@/test-utils';
import { mockSupabaseWithUser, mockSupabaseNoUser } from '@/test-utils/mocks';
import Home from '@/app/page';

vi.mock('@/components/home/GuestHome', () => ({
  default: () => <div>Mock GuestHome</div>,
}));

vi.mock('@/components/home/UserHome', () => ({
  default: ({ email }: { email: string }) => (
    <div>Mock UserHome with {email}</div>
  ),
}));

describe('Home', () => {
  it('renders GuestHome when no user', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      mockSupabaseNoUser
    );

    render(await Home());

    expect(screen.getByText('Mock GuestHome')).toBeInTheDocument();
  });

  it('renders UserHome when user exists', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      mockSupabaseWithUser
    );

    render(await Home());

    expect(screen.getByText(/Mock UserHome with/)).toBeInTheDocument();
  });
});
