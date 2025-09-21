import { signupAction } from '@/app/auth/actions';
import AuthForm from '@/components/AuthForm';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
  const t = useTranslations('LINKS');

  return <AuthForm title={t('REGISTER')} action={signupAction} />;
}
