import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { RestForm } from '@/types/rest.type';
import HeaderRow from '../restClient/HeaderRow';

describe('HeaderRow component', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    Element.prototype.scrollIntoView = vi.fn();
  });
  function setup(valueKey = '') {
    const Wrapper = () => {
      const { register } = useForm<RestForm>({
        defaultValues: {
          headers: [{ key: valueKey, value: '' }],
        },
      });
      return (
        <HeaderRow
          index={0}
          register={register}
          valueKey={valueKey}
          onChangeKey={vi.fn()}
          onRemove={vi.fn()}
        />
      );
    };

    render(<Wrapper />);
  }

  it('renders input fields and remove button', () => {
    setup();
    expect(screen.getByPlaceholderText('Header key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Header value')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens dropdown and filters headers when typing', async () => {
    setup();
    const input = screen.getByPlaceholderText('Header key');
    await userEvent.type(input, 'auth');

    const matches = await screen.findAllByText(/authorization/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('selects header from suggestions', async () => {
    const onChangeKey = vi.fn();
    const Wrapper = () => {
      const { register } = useForm<RestForm>({
        defaultValues: { headers: [{ key: '', value: '' }] },
      });
      return (
        <HeaderRow
          index={0}
          register={register}
          valueKey=""
          onChangeKey={onChangeKey}
          onRemove={vi.fn()}
        />
      );
    };

    render(<Wrapper />);

    const input = screen.getByPlaceholderText('Header key');

    await userEvent.click(input);

    await userEvent.type(input, 'auth');

    const option = await screen.findByRole('option', { name: 'Authorization' });
    await userEvent.click(option);

    expect(onChangeKey).toHaveBeenCalledWith('Authorization');
  });

  it('calls onRemove when clicking remove button', async () => {
    const onRemove = vi.fn();
    const Wrapper = () => {
      const { register } = useForm<RestForm>({
        defaultValues: { headers: [{ key: '', value: '' }] },
      });
      return (
        <HeaderRow
          index={0}
          register={register}
          valueKey=""
          onChangeKey={vi.fn()}
          onRemove={onRemove}
        />
      );
    };

    render(<Wrapper />);
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(onRemove).toHaveBeenCalled();
  });
});
