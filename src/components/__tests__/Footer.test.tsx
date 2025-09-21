import { render, screen } from '@/test-utils';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders Github link, CourseLogo link, and current year', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/vahagn85');

    const year = screen.getByText(
      new RegExp(new Date().getFullYear().toString())
    );
    expect(year).toBeInTheDocument();

    const courseLink = screen.getByRole('link', { name: '' });
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );

    expect(courseLink).toBeInTheDocument();
  });
});
