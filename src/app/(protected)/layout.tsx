import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <div className="container mx-auto p-6">{children}</div>;
}
