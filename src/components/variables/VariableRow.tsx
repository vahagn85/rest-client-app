'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';
import { VariableForm } from '@/types/variable.type';
import { useTranslations } from 'next-intl';

interface VariableRowProps {
  index: number;
  register: UseFormRegister<VariableForm>;
  onRemove: () => void;
}

function VariableRow({ index, register, onRemove }: VariableRowProps) {
  const t = useTranslations('VARIABLE_PAGE');

  return (
    <div className="flex gap-2 items-start">
      <Input
        {...register(`variables.${index}.key`)}
        placeholder={t('VARIABLE_NAME')}
        className="flex-1"
        required
      />

      <Input
        {...register(`variables.${index}.value`)}
        placeholder={t('VARIABLE_VALUE')}
        className="flex-1"
        required
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

export default VariableRow;
