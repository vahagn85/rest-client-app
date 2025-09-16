import { UseFormRegister, FieldArrayWithId } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RestForm } from '@/types/rest.type';

interface RestHeadersProps {
  register: UseFormRegister<RestForm>;
  fields: FieldArrayWithId<RestForm, 'headers', 'id'>[];
  append: (obj: { key: string; value: string }) => void;
  remove: (index: number) => void;
}

function RestHeaders({ register, fields, append, remove }: RestHeadersProps) {
  return (
    <div className="space-y-2 mt-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Input
            placeholder="Key"
            {...register(`headers.${index}.key`)}
            className="w-1/3"
          />
          <Input
            placeholder="Value"
            {...register(`headers.${index}.value`)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            ×
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ key: '', value: '' })}
      >
        + Add Header
      </Button>
    </div>
  );
}
export default RestHeaders;
