import '@/test-utils/mocks';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import RestHeaders from '../restClient/RestHeaders';
import { FieldArrayWithId } from 'react-hook-form';
import { RestForm } from '@/types/rest.type';

vi.mock('../restClient/HeaderRow', () => ({
  default: ({ index, onRemove }: { index: number; onRemove: () => void }) => (
    <div data-testid={`header-row-${index}`}>
      HeaderRow {index}
      <button onClick={onRemove}>remove-{index}</button>
    </div>
  ),
}));

describe('RestHeaders', () => {
  const mockRegister = vi.fn();
  const mockAppend = vi.fn();
  const mockRemove = vi.fn();
  const mockWatch = vi.fn();
  const mockSetValue = vi.fn();

  const defaultFields: FieldArrayWithId<RestForm, 'headers', 'id'>[] = [
    { id: '1', key: 'Authorization', value: 'Bearer token' },
    { id: '2', key: 'Content-Type', value: 'application/json' },
  ];

  const renderComponent = (
    fields: FieldArrayWithId<RestForm, 'headers', 'id'>[] = defaultFields
  ) =>
    render(
      <RestHeaders
        register={mockRegister}
        fields={fields}
        append={mockAppend}
        remove={mockRemove}
        watch={mockWatch}
        setValue={mockSetValue}
      />
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all header rows', () => {
    renderComponent();

    expect(screen.getByTestId('header-row-0')).toBeInTheDocument();
    expect(screen.getByTestId('header-row-1')).toBeInTheDocument();
  });

  it('calls append when clicking add button', async () => {
    const user = userEvent.setup();
    renderComponent();

    const button = screen.getByRole('button', { name: /\+ Add Header/i });
    await user.click(button);

    expect(mockAppend).toHaveBeenCalledWith({ key: '', value: '' });
  });

  it('calls remove when clicking remove button inside HeaderRow', async () => {
    const user = userEvent.setup();
    renderComponent();

    const removeBtn = screen.getByText('remove-0');
    await user.click(removeBtn);

    expect(mockRemove).toHaveBeenCalledWith(0);
  });

  it('renders with no headers and still shows add button', () => {
    renderComponent([]);

    expect(screen.queryByTestId('header-row-0')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /\+ Add Header/i })
    ).toBeInTheDocument();
  });
});
