'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RestForm } from '@/types/rest.type';
import RestBar from './RestBar';
import RestHeaders from './RestHeaders';
import { replaceVariables } from '@/utils/variables';

function RestClient() {
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

  const onSubmit = async (data: RestForm) => {
    try {
      console.log(data);
      const testUrl = '{{Url}}/end/{{TXT}}/1';
      const replaceText = replaceVariables(testUrl);
      console.log(replaceText);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center mb-4">REST Client</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-4xl mx-auto"
      >
        <RestBar register={register} />

        <Tabs defaultValue="headers" className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="body">Body</TabsTrigger>
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
