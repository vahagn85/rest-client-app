'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import VariableRow from './VariableRow';
import { VariableForm } from '@/types/variable.type';

function Variables() {
  const { register, handleSubmit, control } = useForm<VariableForm>({
    defaultValues: {
      variables: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables',
  });

  const onSubmit = (data: VariableForm) => {
    console.log('Saved:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-4xl mx-auto"
    >
      <div className="space-y-2 mt-4 border border-gray-200 rounded p-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-2">
          <h1 className="text-3xl font-semibold">Variables</h1>
          <Button type="submit">Save</Button>
        </div>

        {fields.map((field, index) => (
          <VariableRow
            key={field.id}
            index={index}
            register={register}
            onRemove={() => remove(index)}
          />
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ key: '', value: '' })}
        >
          + Add Variable
        </Button>
      </div>
    </form>
  );
}

export default Variables;
