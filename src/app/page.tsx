import GuestHome from '@/components/home/GuestHome';
import UserHome from '@/components/home/UserHome';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return <UserHome email={user.email} />;
  }

  return <GuestHome />;
}
