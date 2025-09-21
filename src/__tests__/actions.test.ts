import * as actions from '@/app/auth/actions';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

describe('auth actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loginAction calls supabase and redirects on success', async () => {
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce({
      auth: {
        signInWithPassword: vi.fn(() => ({ error: null })),
      },
    });

    const formData = new FormData();
    formData.set('email', 'test@example.com');
    formData.set('password', '123456');

    await actions.loginAction(formData);

    expect(createClient).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('loginAction returns error when supabase returns error', async () => {
    const errorMessage = 'Invalid credentials';
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce({
      auth: {
        signInWithPassword: vi.fn(() => ({ error: { message: errorMessage } })),
      },
    });

    const formData = new FormData();
    formData.set('email', 'wrong@example.com');
    formData.set('password', '123456');

    const result = await actions.loginAction(formData);

    expect(result).toEqual({ error: true, message: errorMessage });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('signupAction calls supabase and redirects on success', async () => {
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce({
      auth: {
        signUp: vi.fn(() => ({ error: null })),
      },
    });

    const formData = new FormData();
    formData.set('email', 'new@example.com');
    formData.set('password', '123456');

    await actions.signupAction(formData);

    expect(createClient).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('signupAction returns error when supabase returns error', async () => {
    const errorMessage = 'Email already exists';
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce({
      auth: {
        signUp: vi.fn(() => ({ error: { message: errorMessage } })),
      },
    });

    const formData = new FormData();
    formData.set('email', 'existing@example.com');
    formData.set('password', '123456');

    const result = await actions.signupAction(formData);

    expect(result).toEqual({ error: true, message: errorMessage });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('signOutAction signs out user and redirects if user exists', async () => {
    const mockSignOut = vi.fn();
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce({
      auth: {
        getUser: vi.fn(() => ({ data: { user: { id: '123' } } })),
        signOut: mockSignOut,
      },
    });

    await actions.signOutAction();

    expect(createClient).toHaveBeenCalled();
    expect(mockSignOut).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('signOutAction does not call signOut if no user', async () => {
    (createClient as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce({
      auth: {
        getUser: vi.fn(() => ({ data: { user: null } })),
        signOut: vi.fn(),
      },
    });

    await actions.signOutAction();

    expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
    expect(redirect).toHaveBeenCalledWith('/');
  });
});
