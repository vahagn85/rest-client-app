import {
  UseFormRegister,
  FieldArrayWithId,
  UseFormWatch,
  UseFormSetValue,
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RestForm } from '@/types/rest.type';
import HeaderRow from './HeaderRow';
import { useTranslations } from 'next-intl';

interface RestHeadersProps {
  register: UseFormRegister<RestForm>;
  fields: FieldArrayWithId<RestForm, 'headers', 'id'>[];
  append: (obj: { key: string; value: string }) => void;
  remove: (index: number) => void;
  watch: UseFormWatch<RestForm>;
  setValue: UseFormSetValue<RestForm>;
}

function RestHeaders({
  register,
  fields,
  append,
  remove,
  watch,
  setValue,
}: RestHeadersProps) {
  const t = useTranslations('REST_PAGE');

  return (
    <div className="space-y-2 mt-4">
      {fields.map((field, index) => (
        <HeaderRow
          key={field.id}
          index={index}
          register={register}
          valueKey={watch(`headers.${index}.key`)}
          onChangeKey={(val) => setValue(`headers.${index}.key`, val)}
          onRemove={() => remove(index)}
        />
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ key: '', value: '' })}
      >
        + {t('ADD_BTN')}
      </Button>
    </div>
  );
}
export default RestHeaders;
