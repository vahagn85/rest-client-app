import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NOT_FOUND_PAGE');

  return <div className="text-center py-8 h-[85vh]">404 - {t('MESSAGE')}</div>;
}
