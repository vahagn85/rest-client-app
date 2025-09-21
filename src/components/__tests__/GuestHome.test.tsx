import { render, screen } from '@/test-utils';
import { ROUTES } from '@/constants/routes';
import GuestHome from '../home/GuestHome';

vi.mock('../GeneralInfo', () => ({
  __esModule: true,
  default: () => <div data-testid="general-info" />,
}));

describe('GuestHome', () => {
  it('renders GeneralInfo and Sign In/Sign Up links', () => {
    render(<GuestHome />);

    expect(screen.getByTestId('general-info')).toBeInTheDocument();

    const loginLink = screen.getByRole('link', { name: 'Sign In' });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', ROUTES.LOGIN);

    const registerLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', ROUTES.REGISTER);
  });
});
