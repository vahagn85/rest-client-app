'use client';

import clsx from 'clsx';
import { useTransition } from 'react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locales';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }
  return (
    <Select onValueChange={onChange} value={defaultValue}>
      <SelectTrigger
        title={label}
        className={clsx(
          'rounded-sm p-2 transition-colors hover:bg-slate-200',
          isPending && 'pointer-events-none opacity-60'
        )}
      >
        <SelectValue placeholder={label}>{defaultValue}</SelectValue>
      </SelectTrigger>
      <SelectContent avoidCollisions={true}>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
