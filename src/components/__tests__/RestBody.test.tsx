import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import RestBody from '../restClient/RestBody';

vi.mock('@uiw/react-codemirror');
describe('RestBody', () => {
  it('renders radio buttons, Prettify button, and CodeMirror', () => {
    const handleChange = vi.fn();
    render(<RestBody value='{"key":"value"}' onChange={handleChange} />);

    const jsonRadio = screen.getByRole('radio', {
      name: /JSON/i,
    }) as HTMLInputElement;
    const textRadio = screen.getByRole('radio', {
      name: /Text/i,
    }) as HTMLInputElement;

    expect(jsonRadio).toBeInTheDocument();
    expect(textRadio).toBeInTheDocument();

    expect(jsonRadio).toHaveAttribute('aria-checked', 'true');
    expect(textRadio).toHaveAttribute('aria-checked', 'false');

    const button = screen.getByRole('button', { name: /Prettify/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('switches mode when selecting Text radio', async () => {
    const handleChange = vi.fn();
    render(<RestBody value='{"key":"value"}' onChange={handleChange} />);

    const textRadio = screen.getByRole('radio', { name: /Text/i });
    await userEvent.click(textRadio);

    expect(textRadio).toBeChecked();
  });

  it('prettifies valid JSON when Prettify is clicked', async () => {
    let value = '{"key":"value"}';
    const handleChange = vi.fn((val) => (value = val));

    render(<RestBody value={value} onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /prettify/i });
    await userEvent.click(button);

    expect(handleChange).toHaveBeenCalled();

    expect(value).toBe(`{
  "key": "value"
}`);
  });

  it('does nothing for invalid JSON when Prettify is clicked', async () => {
    let value = '{"key": value}';
    const handleChange = vi.fn((val) => (value = val));

    render(<RestBody value={value} onChange={handleChange} />);

    const button = screen.getByRole('button', { name: /prettify/i });
    await userEvent.click(button);

    expect(handleChange).not.toHaveBeenCalled();
    expect(value).toBe('{"key": value}');
  });
});
