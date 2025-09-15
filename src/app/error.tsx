'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('ERROR_PAGE');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{t('TITLE')}</h2>
      <button onClick={() => reset()}>{t('RESET_BUTTON')}</button>
    </div>
  );
}
