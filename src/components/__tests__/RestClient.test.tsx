import { render, screen, waitFor, act } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { saveData } from '@/app/(protected)/rest/action';
import { toast } from 'sonner';
import RestClient from '../restClient/RestClient';

vi.mock('next/navigation', () => ({
  useParams: () => ({ rest: ['GET', 'aHR0cHM6Ly9hcGkuY29t', ''] }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/app/(protected)/rest/action', () => ({
  saveData: vi.fn(),
}));
vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));
vi.mock('@uiw/react-codemirror', () => {
  return {
    __esModule: true,
    default: (props: { value: string }) => (
      <div data-testid="codemirror">{props.value}</div>
    ),
  };
});

describe('RestClient', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders heading and tabs', async () => {
    await act(async () => {
      render(<RestClient />);
    });
    await waitFor(() => {
      expect(screen.getByText('REST Client')).toBeInTheDocument();
      expect(screen.getByText('Headers')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
    });
  });

  it('shows error toast when URL is invalid', async () => {
    (saveData as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      success: false,
      error: 'Failed',
    });
    await act(async () => {
      render(<RestClient />);
    });
    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to save in Database! (Failed)'
      )
    );
  });

  it('calls saveData and shows success toast when request succeeds', async () => {
    (saveData as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      success: true,
      data: { route: 'GET/example.com' },
      response: { status: 200, body: '{"ok":true}', isJson: true },
    });

    await act(async () => {
      render(<RestClient />);
    });

    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(
        'Saved in Database! (GET/example.com)'
      )
    );

    expect(saveData).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByText(/"ok":true/)).toBeInTheDocument()
    );
  });

  it('shows error toast when saveData fails', async () => {
    (saveData as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      success: false,
      error: 'Network error',
    });

    await act(async () => {
      render(<RestClient />);
    });

    const submitButton = screen.getByRole('button', { name: /send/i });
    await user.click(submitButton);

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to save in Database! (Network error)'
      )
    );
  });
});
