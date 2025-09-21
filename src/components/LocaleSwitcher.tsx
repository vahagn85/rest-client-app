import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations('LOCALE_SWITCHER');

  return (
    <LocaleSwitcherSelect
      defaultValue={currentLocale}
      items={[
        {
          value: 'en',
          label: t('en'),
        },
        {
          value: 'ru',
          label: t('ru'),
        },
      ]}
      label={t('SELECTOR_TITLE')}
    />
  );
}
