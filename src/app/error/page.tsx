'use client';
import { useTranslations } from 'next-intl';

export default function ErrorPage() {
  const t = useTranslations('ERROR_PAGE');

  return <h2 className="text-center m-15">{t('TITLE')}</h2>;
}
