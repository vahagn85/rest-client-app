'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useMemo, useState } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { createFormSchema } from '@/validation/formSchema';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface AuthFormProps {
  title: string;
  action: (
    formData: FormData
  ) => Promise<void | { error: boolean; message: string }>;
}

export default function AuthForm({ title, action }: AuthFormProps) {
  const t = useTranslations('FORM');
  const formSchema = useMemo(() => createFormSchema(t), [t]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    defaultValues: { email: '', password: '' },
  });

  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);

      const result = await action(formData);

      if (result?.error) {
        toast.error(result.message);
        setErrorMsg(result.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg(t('ERROR_UNEXPECTED'));
      }
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl mb-4 font-bold text-center">{title}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('EMAIL')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('ENTER_EMAIL')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('PASSWORD')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('ENTER_PASSWORD')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMsg && (
            <Alert variant="destructive" className="bg-red-100">
              <AlertCircleIcon />
              <AlertTitle>{errorMsg}</AlertTitle>
              <AlertDescription>{t('TRY_AGAIN')}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? t('SUBMITTING') : t('SUBMIT')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
