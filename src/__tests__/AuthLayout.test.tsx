import '@/test-utils/mocks';
import { render, screen } from '@/test-utils';
import AuthLayout from '@/app/(auth)/layout';
import { mockSupabaseWithUser, mockSupabaseNoUser } from '@/test-utils/mocks';
import { redirect } from 'next/navigation';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('AuthLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when no user', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      mockSupabaseNoUser
    );

    const ui = await AuthLayout({ children: <div>Public Page</div> });
    render(ui);

    expect(screen.getByText('Public Page')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('redirects when user exists', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      mockSupabaseWithUser
    );

    await AuthLayout({ children: <div>Should not render</div> });

    expect(redirect).toHaveBeenCalledWith('/');
  });
});
