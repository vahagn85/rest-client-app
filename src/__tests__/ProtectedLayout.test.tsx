import '@/test-utils/mocks';
import { render, screen } from '@/test-utils';

import { mockSupabaseWithUser, mockSupabaseNoUser } from '@/test-utils/mocks';
import { redirect } from 'next/navigation';
import ProtectedLayout from '@/app/(protected)/layout';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('ProtectedLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects when no user', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      mockSupabaseNoUser
    );

    await ProtectedLayout({ children: <div>Should not render</div> });

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('renders children when user exists', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      mockSupabaseWithUser
    );

    const ui = await ProtectedLayout({ children: <div>Private Page</div> });
    render(ui);

    expect(screen.getByText('Private Page')).toBeInTheDocument();
    expect(redirect).not.toHaveBeenCalled();
  });
});
