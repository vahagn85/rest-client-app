import { render, screen } from '@/test-utils';
import { mockSupabaseWithUser } from '@/test-utils/mocks';
import Header from '@/components/Header';

describe('Header', () => {
  it('renders Sign In/Sign Up when no user', async () => {
    render(await Header());

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('renders Main/Sign Out when user exists', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      mockSupabaseWithUser
    );
    render(await Header());

    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
});
