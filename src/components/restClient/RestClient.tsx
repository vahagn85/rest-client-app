'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RestForm } from '@/types/rest.type';
import RestBar from './RestBar';
import RestHeaders from './RestHeaders';
import { saveData } from '@/app/(protected)/rest/action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

function RestClient() {
  const t = useTranslations('REST_PAGE');

  const { register, handleSubmit, control, watch, setValue } =
    useForm<RestForm>({
      defaultValues: {
        url: '',
        method: 'GET',
        body: '',
        headers: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });
  const route = useRouter();

  const onSubmit = async (data: RestForm) => {
    try {
      if (!data.url) {
        toast.error(t('ALERT_URL'));
        return;
      }

      const result = await saveData(data);

      if (result.success) {
        toast.success(`${t('ALERT_SUCCESS')} (${result.data?.route})`);
        route.push(`/rest/${result.data?.route}`);
      } else {
        toast.error(`${t('ALERT_ERROR')} (${result.error})`);
      }
    } catch {}
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center mb-4">{t('TITLE')}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-4xl mx-auto"
      >
        <RestBar register={register} control={control} />

        <Tabs defaultValue="headers" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="headers">{t('TAB_HEADER')}</TabsTrigger>
            <TabsTrigger value="body">{t('TAB_BODY')}</TabsTrigger>
          </TabsList>

          <TabsContent
            value="headers"
            className="border border-gray-200 rounded px-4 pb-4 shadow-xl"
          >
            <RestHeaders
              register={register}
              fields={fields}
              append={append}
              remove={remove}
              watch={watch}
              setValue={setValue}
            />
          </TabsContent>

          <TabsContent
            value="body"
            className="border border-gray-200 rounded px-4 pb-4 shadow-xl"
          >
            <p>BODY</p>
          </TabsContent>
        </Tabs>
      </form>
    </>
  );
}
export default RestClient;
