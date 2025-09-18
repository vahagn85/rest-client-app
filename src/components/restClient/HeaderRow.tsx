'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { HEADER_KEYS } from '@/constants/headers';
import { X } from 'lucide-react';
import { useState } from 'react';
import { RestForm } from '@/types/rest.type';
import { UseFormRegister } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface HeaderRowProps {
  index: number;
  register: UseFormRegister<RestForm>;
  valueKey: string;
  onChangeKey: (val: string) => void;
  onRemove: () => void;
}

function HeaderRow({
  index,
  register,
  valueKey,
  onChangeKey,
  onRemove,
}: HeaderRowProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const t = useTranslations('REST_PAGE');

  const filtered = HEADER_KEYS.filter((h) =>
    h.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="flex gap-2 items-start">
      <div className="relative flex-1">
        <Input
          {...register(`headers.${index}.key`)}
          value={valueKey}
          placeholder={t('HEADER_KEY')}
          onChange={(e) => {
            setQuery(e.target.value);
            onChangeKey(e.target.value);
            setOpen(true);
          }}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-md">
            <Command shouldFilter={false}>
              <CommandList>
                <CommandGroup>
                  {filtered.map((header) => (
                    <CommandItem
                      key={header}
                      onMouseDown={() => {
                        onChangeKey(header);
                        setQuery(header);
                        setOpen(false);
                      }}
                    >
                      {header}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>

      <Input
        {...register(`headers.${index}.value`)}
        placeholder={t('HEADER_VALUE')}
        className="flex-1"
      />

      <Button
        type="button"
        size="icon"
        variant="destructive"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default HeaderRow;
