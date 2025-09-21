import enMessages from '../../messages/en.json';

type Messages = typeof enMessages;

export const mockSupabaseNoUser = {
  auth: {
    getUser: vi.fn(() => Promise.resolve({ data: { user: null } })),
  },
};

export const mockSupabaseWithUser = {
  auth: {
    getUser: vi.fn(() => Promise.resolve({ data: { user: { id: '123' } } })),
  },
};

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn(() => mockSupabaseNoUser),
}));

function getMessage<T extends keyof Messages>(
  section: T,
  key: keyof Messages[T]
): string {
  return enMessages[section][key] as string;
}

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn((section?: keyof Messages) =>
    Promise.resolve((key: string) => {
      if (section && key in enMessages[section]) {
        return getMessage(section, key as keyof Messages[typeof section]);
      }
      return key;
    })
  ),
}));

vi.mock('next-intl', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-intl')>();
  return {
    ...actual,
    useTranslations: (section?: keyof typeof enMessages) => {
      return (key: string) => {
        if (section && key in enMessages[section]) {
          return (enMessages[section] as Record<string, string>)[key];
        }
        return key;
      };
    },
    useLocale: () => 'en',
  };
});

vi.mock('@/app/auth/actions', () => ({
  signOutAction: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/utils/variables', () => ({
  replaceVariables: (url: string) => url,
}));

vi.mock('@/utils/codeGeneration', () => {
  return {
    LANGUAGES: [
      { value: 'shell-curl', key: 'shell', label: 'curl', client: 'curl' },
      {
        value: 'javascript-fetch',
        key: 'javascript',
        label: 'JavaScript (Fetch)',
        client: 'fetch',
      },
      {
        value: 'python-requests',
        key: 'python',
        label: 'Python',
        client: 'requests',
      },
    ],
    generateCodeSnippet: vi.fn(),
  };
});
