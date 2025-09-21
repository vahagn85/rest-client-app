import { render, screen } from '@/test-utils';
import { ROUTES } from '@/constants/routes';
import UserHome from '../home/UserHome';

vi.mock('../GeneralInfo', () => ({
  __esModule: true,
  default: () => <div data-testid="general-info" />,
}));

describe('UserHome', () => {
  it('renders with email', () => {
    const email = 'user@example.com';
    render(<UserHome email={email} />);

    const mail = screen.getByText(`${email}!`);
    expect(mail).toBeInTheDocument();
  });

  it('renders navigation links to REST, History, and Variables', () => {
    render(<UserHome email="test@example.com" />);

    const restLink = screen.getByRole('link', { name: 'REST Client' });
    expect(restLink).toBeInTheDocument();
    expect(restLink).toHaveAttribute('href', ROUTES.REST);

    const historyLink = screen.getByRole('link', { name: 'History' });
    expect(historyLink).toBeInTheDocument();
    expect(historyLink).toHaveAttribute('href', ROUTES.HISTORY);

    const variableLink = screen.getByRole('link', { name: 'Variables' });
    expect(variableLink).toBeInTheDocument();
    expect(variableLink).toHaveAttribute('href', ROUTES.VARIABLE);
  });

  it('renders GeneralInfo component', () => {
    render(<UserHome email="test@example.com" />);
    expect(screen.getByTestId('general-info')).toBeInTheDocument();
  });
});
