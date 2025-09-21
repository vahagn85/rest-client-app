import { saveData } from '@/app/(protected)/rest/action';
import { createClient } from '@/utils/supabase/server';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

global.fetch = vi.fn();

describe('saveData', () => {
  const mockUser = { id: '123', email: 'test@example.com' };
  const mockSupabase = {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      insert: vi.fn(),
    })),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockSupabase
    );
  });

  it('returns error if user is not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });
    const result = await saveData(
      { method: 'GET', url: 'https://example.com', headers: [] },
      'route1'
    );
    expect(result).toEqual({ success: false, error: 'User not auth' });
  });

  it('returns success when fetch succeeds and insert succeeds', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const insertMock = vi.fn().mockResolvedValue({ error: null });
    mockSupabase.from = vi.fn(() => ({ insert: insertMock }));

    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      clone: () => ({ text: async () => '{"ok":true}' }),
      text: async () => '{"ok":true}',
    });

    const result = await saveData(
      { method: 'GET', url: 'https://example.com', headers: [] },
      'route1'
    );

    expect(result.success).toBe(true);
    expect(result.response?.body).toBe('{"ok":true}');
  });

  it('returns error when fetch fails', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
    (
      mockSupabase.from().insert as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({ error: null });
    (fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Network error')
    );

    const result = await saveData(
      { method: 'GET', url: 'https://example.com', headers: [] },
      'route1'
    );

    expect(result.success).toBe(false);
    expect(result.response?.body).toBe('Network error');
  });

  it('returns error when Supabase insert fails', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });
    (
      mockSupabase.from().insert as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      error: { message: 'Insert failed' },
    });
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      status: 200,
      clone: () => ({ text: async () => '{"ok":true}' }),
      text: async () => '{"ok":true}',
    });

    const result = await saveData(
      { method: 'GET', url: 'https://example.com', headers: [] },
      'route1'
    );

    expect(result.success).toBe(false);
    expect(result.error).toBe('Insert failed');
  });
});
