'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations('ERROR_PAGE');

  return (
    <div className="flex flex-col items-center justify-center mt-15 space-y-4">
      <h2>{t('TITLE')}</h2>
      <Button variant="default" onClick={() => reset()}>
        {t('RESET_BUTTON')}
      </Button>
    </div>
  );
}
