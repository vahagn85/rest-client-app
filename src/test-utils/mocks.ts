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
vi.mock('next-intl', () => ({
  useTranslations: (section?: keyof Messages) => {
    return (key: string) => {
      if (section && key in enMessages[section]) {
        return getMessage(section, key as keyof Messages[typeof section]);
      }
      return key;
    };
  },
  useLocale: () => 'en',
}));

vi.mock('@/app/auth/actions', () => ({
  signOutAction: vi.fn(),
}));
