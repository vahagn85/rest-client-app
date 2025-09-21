import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NOT_FOUND_PAGE');

  return (
    <div className="flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">{t('MESSAGE')}</p>
      </div>
    </div>
  );
}
