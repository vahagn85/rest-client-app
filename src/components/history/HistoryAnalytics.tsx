'use client';

import { RequestRest } from '@/types/rest.type';

function HistoryAnalytics({ data }: { data: RequestRest[] }) {
  return (
    <div>
      <h1>History and analytics</h1>
      {<pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default HistoryAnalytics;
