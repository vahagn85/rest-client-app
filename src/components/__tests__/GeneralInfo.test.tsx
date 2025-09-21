import { render, screen } from '@/test-utils';
import GeneralInfo from '../GeneralInfo';
import { DEVELOPERS } from '@/constants/developers';

vi.mock('lucide-react', () => ({
  GitBranchPlus: () => <svg data-testid="git-icon" />,
}));

describe('GeneralInfo', () => {
  it('renders project section with description', () => {
    render(<GeneralInfo />);
    expect(screen.getByText('Project')).toBeInTheDocument();
    expect(screen.getByText(/Rest Client/)).toBeInTheDocument();
    expect(screen.getByText(/This project/)).toBeInTheDocument();
  });

  it('renders developers section with all developers', () => {
    render(<GeneralInfo />);
    expect(screen.getByText('Developers')).toBeInTheDocument();

    DEVELOPERS.forEach((dev, index) => {
      expect(screen.getByText(dev.name)).toBeInTheDocument();

      const icons = screen.getAllByTestId('git-icon');
      expect(icons[index].closest('a')).toHaveAttribute('href', dev.url);
    });
  });

  it('renders course section with description', () => {
    render(<GeneralInfo />);
    expect(screen.getByText('React Course')).toBeInTheDocument();
    expect(screen.getByText(/Everyone can study/)).toBeInTheDocument();
  });
});
