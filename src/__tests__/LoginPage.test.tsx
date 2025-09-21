import { render, screen } from '@/test-utils';
import user from '@testing-library/user-event';
import * as actions from '@/app/auth/actions';
import LoginPage from '@/app/(auth)/login/page';

vi.mock('@/components/AuthForm', () => ({
  default: ({
    title,
    action,
  }: {
    title: string;
    action: (
      formData: FormData
    ) => Promise<{ error: boolean; message: string }>;
  }) => (
    <div>
      <span>{title}</span>
      <button onClick={() => action(new FormData())}>Submit</button>
    </div>
  ),
}));

describe('LoginPage', () => {
  it('renders AuthForm with correct title', () => {
    render(<LoginPage />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('calls loginAction when form is submitted', async () => {
    const loginSpy = vi
      .spyOn(actions, 'loginAction')
      .mockResolvedValue({ error: false, message: '' });

    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(loginSpy).toHaveBeenCalled();
  });
});
