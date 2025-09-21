import { render, screen, waitFor } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import AuthForm from '../AuthForm';

describe('AuthForm', () => {
  const setup = (action = vi.fn()) => {
    render(<AuthForm title="Login" action={action} />);
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    return { emailInput, passwordInput, submitButton, action };
  };

  it('renders form with title and fields', () => {
    setup();
    expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /SUBMIT/i })).toBeInTheDocument();
  });

  it('shows validation errors when inputs are empty', async () => {
    const { submitButton } = setup();
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be/i)).toBeInTheDocument();
    });
  });

  it('calls action and shows error on failed submit', async () => {
    const action = vi
      .fn()
      .mockResolvedValue({ error: true, message: 'Invalid credentials' });
    const { emailInput, passwordInput, submitButton } = setup(action);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123!');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('calls action and does not show error on successful submit', async () => {
    const action = vi.fn().mockResolvedValue(undefined);
    const { emailInput, passwordInput, submitButton } = setup(action);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123!');

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(1);
      expect(
        screen.queryByText(/Invalid credentials/i)
      ).not.toBeInTheDocument();
    });
  });

  it('shows error alert when action returns an error', async () => {
    const action = vi.fn().mockResolvedValue({
      error: true,
      message: 'Invalid credentials',
    });

    const { emailInput, passwordInput, submitButton } = setup(action);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      expect(screen.getByText('Please try again.')).toBeInTheDocument();
    });
  });

  it('does not show alert when action is successful', async () => {
    const action = vi.fn().mockResolvedValue(undefined);

    const { emailInput, passwordInput, submitButton } = setup(action);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(action).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
