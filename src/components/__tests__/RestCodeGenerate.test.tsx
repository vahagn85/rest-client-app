import '@/test-utils/mocks';
import { render, screen, waitFor } from '@/test-utils';

import { generateCodeSnippet } from '@/utils/codeGeneration';
import RestCodeGenerate from '../restClient/RestCodeGenerate';

describe('RestCodeGenerate component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with heading and select', async () => {
    render(
      <RestCodeGenerate method="GET" url="https://example.com" headers={[]} />
    );
    await waitFor(() => {
      expect(screen.getByText('Generate Code')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  it('shows error if url is missing', async () => {
    render(<RestCodeGenerate method="GET" url="" headers={[]} />);
    await waitFor(() => {
      expect(
        screen.getByText('Not enough details to generate code.')
      ).toBeInTheDocument();
    });
  });

  it('shows error if url is invalid', async () => {
    render(<RestCodeGenerate method="GET" url="invalid-url" headers={[]} />);
    await waitFor(() => {
      expect(
        screen.getByText("URL must start with 'http://' or 'https://'.")
      ).toBeInTheDocument();
    });
  });

  it('renders code when snippet is generated', async () => {
    (
      generateCodeSnippet as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue('fetch("https://example.com")');

    render(
      <RestCodeGenerate method="GET" url="https://example.com" headers={[]} />
    );

    await waitFor(() => {
      expect(
        screen.getByText(/fetch\("https:\/\/example\.com"\)/)
      ).toBeInTheDocument();
    });
  });
});
