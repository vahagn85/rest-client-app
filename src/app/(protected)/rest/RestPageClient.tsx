'use client';

import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('@/components/restClient/RestClient'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function RestPageClient() {
  return <RestClient />;
}
