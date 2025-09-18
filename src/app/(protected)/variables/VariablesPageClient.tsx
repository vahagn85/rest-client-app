'use client';

import dynamic from 'next/dynamic';

const Variables = dynamic(() => import('@/components/variables/Variables'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function VariablesPageClient() {
  return <Variables />;
}
