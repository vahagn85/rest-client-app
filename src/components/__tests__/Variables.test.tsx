import '@/test-utils/mocks';
import { render, screen, waitFor } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import Variables from '../variables/Variables';
import { toast } from 'sonner';

describe('Variables component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders form and initial buttons', () => {
    render(<Variables />);

    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('+ Add Variable')).toBeInTheDocument();
  });

  it('can add a new variable row', async () => {
    render(<Variables />);
    const addButton = screen.getByText('+ Add Variable');

    await userEvent.click(addButton);
    expect(screen.getAllByRole('textbox').length).toBe(2);
  });

  it('saves variables to localStorage and shows toast', async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(<Variables />);

    const addButton = screen.getByText('+ Add Variable');
    await user.click(addButton);

    const inputs = await screen.findAllByRole('textbox');

    await user.type(inputs[0], 'myKey');
    await user.type(inputs[1], 'myValue');

    const saveButton = screen.getByText('Save');
    await user.click(saveButton);

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith(
        'rest-client-variables',
        JSON.stringify([{ key: 'myKey', value: 'myValue' }])
      );
    });

    expect(toast.success).toHaveBeenCalledWith(
      'Variables has been saved to LS'
    );
  });
});
