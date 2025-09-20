'use client';

import { useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RestForm } from '@/types/rest.type';
import RestBar from './RestBar';
import RestHeaders from './RestHeaders';
import { saveData } from '@/app/(protected)/rest/action';
import { toast } from 'sonner';
import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import RestCodeGenerate from './RestCodeGenerate';
import RestBody from './RestBody';
import RestResponse from './RestResponse';
import { hasProtocol, parseRouteToData } from '@/utils/restTransform';

function RestClient() {
  const t = useTranslations('REST_PAGE');
  const tGeneral = useTranslations('GENERAL');
  const [response, setResponse] = useState<{
    status: number | null;
    body: string;
    isJson: boolean;
  }>({ status: null, body: '', isJson: false });

  const params = useParams();
  const searchParams = useSearchParams();
  const [method, encodedUrl, encodedBody] = params.rest || [];

  const initialValues = useMemo(
    () =>
      parseRouteToData(
        method,
        encodedUrl,
        encodedBody,
        searchParams.toString()
      ),
    [method, encodedUrl, encodedBody, searchParams]
  );

  const { register, handleSubmit, control, watch, setValue } =
    useForm<RestForm>({
      defaultValues: initialValues,
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const onSubmit = async (data: RestForm) => {
    try {
      if (!data.url || hasProtocol(data.url)) {
        toast.error(t('ALERT_URL'));
        return;
      }

      const result = await saveData(data);

      if (result.success) {
        toast.success(`${t('ALERT_SUCCESS')} (${result.data?.route})`);
        window.history.replaceState(null, '', `/rest/${result.data?.route}`);
      } else {
        toast.error(`${t('ALERT_ERROR')} (${result.error})`);
      }
      if (result.response) {
        setResponse(result.response);
      }
    } catch {
      toast.error(t('ALERT_ERROR'));
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center mb-4">
        {tGeneral('REST_CLIENT')}
      </h1>
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
            <RestBody
              value={watch('body') || ''}
              onChange={(value) => setValue('body', value)}
            />
          </TabsContent>
        </Tabs>
      </form>
      <RestCodeGenerate
        method={watch('method')}
        url={watch('url')}
        headers={watch('headers')}
        body={watch('body')}
      />
      <RestResponse
        status={response.status}
        body={response.body}
        isJson={response.isJson}
      />
    </>
  );
}
export default RestClient;
