'use client'; // Make this a client component for interactivity

import { useLocale, useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { LOCALES } from '@/i18n/locales';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations('LOCALE_SWITCHER');

  const handleLocaleChange = (newLocale: string) => {
    Cookies.set('locale', newLocale, { expires: 365 });
    window.location.reload();
  };

  return (
    <Select
      onValueChange={handleLocaleChange}
      value={currentLocale}
      // open={true}
    >
      <SelectTrigger title={t('SELECTOR_TITLE')}>
        <SelectValue placeholder={t('SELECTOR_TITLE')}>
          {currentLocale}
        </SelectValue>
      </SelectTrigger>
      <SelectContent avoidCollisions={true}>
        {LOCALES.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locale}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
