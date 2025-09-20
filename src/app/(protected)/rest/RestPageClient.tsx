'use client';

import Loader from '@/components/Loader';
import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('@/components/restClient/RestClient'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function RestPageClient() {
  return <RestClient />;
}
