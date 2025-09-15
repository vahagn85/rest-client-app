import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';
import { ROUTES } from '@/constants/routes';
import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import { Button } from './ui/button';
import { signOutAction } from '@/app/auth/actions';

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations('LINKS');

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
          {user ? (
            <form action={signOutAction}>
              <Button variant="secondary">{t('LOGOUT')}</Button>
            </form>
          ) : (
            <Link
              className="underline underline-offset-2"
              href={ROUTES.REGISTER}
            >
              {t('REGISTER')}
            </Link>
          )}
        </div>
        <LocaleSwitcher />
      </nav>
    </header>
  );
}
