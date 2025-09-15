import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useTranslations } from 'next-intl';

function GuestHome() {
  const t = useTranslations('LINKS');
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
      <div className="flex gap-4">
        <Link
          href={ROUTES.LOGIN}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          {t('LOGIN')}
        </Link>
        <Link
          href={ROUTES.REGISTER}
          className="px-6 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
        >
          {t('REGISTER')}
        </Link>
      </div>
    </div>
  );
}
export default GuestHome;
