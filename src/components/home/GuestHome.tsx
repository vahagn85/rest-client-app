import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { useTranslations } from 'next-intl';
import GeneralInfo from '../GeneralInfo';

function GuestHome() {
  const t = useTranslations('LINKS');

  return (
    <div className="max-w-4xl mx-auto mt-8 px-6">
      <GeneralInfo />
      <div className="flex items-center gap-4 justify-center mt-8">
        <Link
          href={ROUTES.LOGIN}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          {t('LOGIN')}
        </Link>
        <Link
          href={ROUTES.REGISTER}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          {t('REGISTER')}
        </Link>
      </div>
    </div>
  );
}
export default GuestHome;
