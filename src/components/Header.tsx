import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';
import { ROUTES } from '@/constants/routes';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('LINKS');

  return (
    <header className="sticky top-0 py-4">
      <nav className="flex justify-between relative">
        <Link href={ROUTES.ROOT} className="font-bold italic text-xl">
          REST
        </Link>
        <div className="flex gap-8">
          <Link className="underline underline-offset-2" href={ROUTES.LOGIN}>
            {t('LOGIN')}
          </Link>
          <Link className="underline underline-offset-2" href={ROUTES.REGISTER}>
            {t('REGISTER')}
          </Link>
        </div>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
