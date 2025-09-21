import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import RestBar from '../restClient/RestBar';
import { RestForm } from '@/types/rest.type';

describe('RestBar', () => {
  function Wrapper() {
    const { control, register, watch } = useForm<RestForm>({
      defaultValues: { method: 'GET', url: '' },
    });

    const methodValue = watch('method');

    return (
      <>
        <RestBar control={control} register={register} />
        <div data-testid="method-value">{methodValue}</div>
      </>
    );
  }
  it('renders select, input, and button', () => {
    render(<Wrapper />);
    const selectTrigger = screen.getByRole('combobox');
    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button');

    expect(selectTrigger).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('allows typing in the URL input', async () => {
    render(<Wrapper />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'https://test.com');

    expect((input as HTMLInputElement).value).toBe('https://test.com');
  });
});
