import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ROUTES } from '@/constants/routes';

function HistoryEmpty() {
  const t = useTranslations('HISTORY_PAGE');
  const tGeneral = useTranslations('GENERAL');

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 border border-gray-200 rounded shadow-xl mt-4 text-center">
      <h1 className="text-2xl font-bold mb-4">{t('EMPTY')}</h1>
      <p className="text-gray-600 mb-6">{t('TRY')}</p>
      <Link
        href={ROUTES.REST}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {tGeneral('REST_CLIENT')}
      </Link>
    </div>
  );
}

export default HistoryEmpty;
