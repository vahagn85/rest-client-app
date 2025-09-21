import { loginAction } from '@/app/auth/actions';
import AuthForm from '@/components/AuthForm';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('LINKS');

  return <AuthForm title={t('LOGIN')} action={loginAction} />;
}
