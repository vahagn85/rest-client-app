import { signupAction } from '@/app/auth/actions';
import AuthForm from '@/components/AuthForm';

export default function RegisterPage() {
  return (
    <AuthForm
      title="Registration"
      action={signupAction}
      buttonText="Register"
    />
  );
}
