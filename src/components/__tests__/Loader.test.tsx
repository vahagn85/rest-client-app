import { render } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader', () => {
  it('render the loader component', () => {
    const { container } = render(<Loader />);

    expect(container).toBeInTheDocument();
  });

  it('render the spinning element', () => {
    const { container } = render(<Loader />);

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('render correct DOM structure', () => {
    const { container } = render(<Loader />);

    expect(container.children).toHaveLength(1);

    const loaderContainer = container.firstChild as HTMLElement;
    expect(loaderContainer.children).toHaveLength(1);

    const spinner = loaderContainer.firstChild as HTMLElement;
    expect(spinner).toHaveClass('animate-spin');
  });
});
