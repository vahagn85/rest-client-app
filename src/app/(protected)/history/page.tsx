import { createClient } from '@/utils/supabase/server';
import dynamic from 'next/dynamic';
import HistoryEmpty from '@/components/history/HistoryEmpty';

const HistoryAnalytics = dynamic(
  () => import('@/components/history/HistoryAnalytics'),
  { ssr: true }
);

export default async function HistoryPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('requests_log')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <p className="text-red-500">Failed to load history: {error.message}</p>
    );
  }

  if (!data || data.length === 0) {
    return <HistoryEmpty />;
  }

  return <HistoryAnalytics data={data} />;
}
