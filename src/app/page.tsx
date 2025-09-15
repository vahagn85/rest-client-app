import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HOME_PAGE');

  return <h1>{t('TITLE')}</h1>;
}
