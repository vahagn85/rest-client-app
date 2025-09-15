import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center container max-w-xl m-auto px-4 py-5 shadow bg-gray-50 border border-gray-300 rounded">
      {children}
    </div>
  );
}
