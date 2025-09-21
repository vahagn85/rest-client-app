'use client';

import Loader from '@/components/Loader';
import dynamic from 'next/dynamic';

const Variables = dynamic(() => import('@/components/variables/Variables'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function VariablesPageClient() {
  return <Variables />;
}
