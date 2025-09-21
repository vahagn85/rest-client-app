import { render, screen } from '@/test-utils';
import RestResponse from '../restClient/RestResponse';

vi.mock('@uiw/react-codemirror', () => {
  return {
    __esModule: true,
    default: (props: { value: string }) => (
      <div data-testid="codemirror">{props.value}</div>
    ),
  };
});

describe('RestResponse', () => {
  it('renders status and body', () => {
    render(<RestResponse status={200} body='{"key":"value"}' isJson />);

    expect(screen.getByText('Response')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();

    expect(screen.getByText('200')).toBeInTheDocument();

    const codeMirror = screen.getByTestId('codemirror');
    expect(JSON.parse(codeMirror.textContent || '{}')).toEqual({
      key: 'value',
    });
  });

  it('renders "-" for null status', () => {
    render(<RestResponse status={null} body="Test body" />);

    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders non-JSON body as-is', () => {
    render(<RestResponse status={null} body="Not JSON" isJson />);

    expect(screen.getByTestId('codemirror')).toHaveTextContent('Not JSON');
  });

  it('renders JSON body prettified if valid', () => {
    render(<RestResponse status={null} body='{"a":1}' isJson />);

    const codeMirror = screen.getByTestId('codemirror');
    expect(JSON.parse(codeMirror.textContent || '{}')).toEqual({ a: 1 });
  });
});
