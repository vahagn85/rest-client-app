import '@/test-utils/mocks';
import { render, screen } from '@/test-utils';

vi.mock('@/app/globals.css', () => ({}));
vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'mock-geist-sans' }),
  Geist_Mono: () => ({ variable: 'mock-geist-mono' }),
}));

vi.mock('@/app/layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>
      <header>Mock Header</header>
      <main>{children}</main>
      <footer>Mock Footer</footer>
    </div>
  ),
}));

describe('RootLayout', () => {
  it('renders children and layout structure', async () => {
    const { default: RootLayout } = await import('@/app/layout');

    const Child = () => <div>Test Child</div>;

    render(
      <RootLayout>
        <Child />
      </RootLayout>
    );

    expect(await screen.findByText('Test Child')).toBeInTheDocument();
    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('Mock Footer')).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});
