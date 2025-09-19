import { createClient } from '@/utils/supabase/server';
import dynamic from 'next/dynamic';

const HistoryAnalytics = dynamic(
  () => import('@/components/history/HistoryAnalytics'),
  { ssr: true }
);

export default async function HistoryPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('requests_log').select('*');

  if (error) {
    return (
      <p className="text-red-500">Failed to load history: {error.message}</p>
    );
  }
  return <HistoryAnalytics data={data} />;
}
