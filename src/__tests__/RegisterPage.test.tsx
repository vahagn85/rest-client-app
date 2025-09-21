import { render, screen } from '@/test-utils';
import user from '@testing-library/user-event';

import * as actions from '@/app/auth/actions';
import RegisterPage from '@/app/(auth)/register/page';

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

describe('RegisterPage', () => {
  it('renders AuthForm with correct title', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('calls signupAction when form is submitted', async () => {
    const signupSpy = vi
      .spyOn(actions, 'signupAction')
      .mockResolvedValue({ error: false, message: '' });

    render(<RegisterPage />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(signupSpy).toHaveBeenCalled();
  });
});
