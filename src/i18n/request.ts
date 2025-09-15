import { cookies as getCookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { LOCALES } from '@/i18n/locales';

const requestConfig = getRequestConfig(async () => {
  const cookies = await getCookies();

  const locale = cookies.get('locale')?.value || LOCALES[0];

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

export default requestConfig;
