import { loginAction } from '@/app/auth/actions';
import AuthForm from '@/components/AuthForm';

export default function LoginPage() {
  return <AuthForm title="Login" action={loginAction} buttonText="Login" />;
}
