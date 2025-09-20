import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';
import { ROUTES } from '@/constants/routes';
import { createClient } from '@/utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import { Button } from './ui/button';
import { signOutAction } from '@/app/auth/actions';
import HeaderWrapper from './HeaderWrapper';
import { AppLogo } from './icons/AppLogo';

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations('LINKS');

  return (
    <HeaderWrapper>
      <nav className="flex justify-between relative">
        <Link href={ROUTES.ROOT}>
          <AppLogo className="w-20 h-12" />
        </Link>
        <div className="flex flex-wrap items-center gap-4">
          {user ? (
            <form action={signOutAction}>
              <Button variant="secondary">{t('LOGOUT')}</Button>
            </form>
          ) : (
            <>
              <Link
                className="underline underline-offset-2"
                href={ROUTES.LOGIN}
              >
                {t('LOGIN')}
              </Link>
              <Link
                className="underline underline-offset-2"
                href={ROUTES.REGISTER}
              >
                {t('REGISTER')}
              </Link>
            </>
          )}
          <LocaleSwitcher />
        </div>
      </nav>
    </HeaderWrapper>
  );
}
