'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState } from 'react';
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
import { formSchema } from '@/validation/formSchema';

interface AuthFormProps {
  title: string;
  action: (formData: FormData) => Promise<void>;
  buttonText: string;
}

export default function AuthForm({ title, action, buttonText }: AuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);

      await action(formData);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Something went wrong!');
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
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
              <AlertDescription>Please try again.</AlertDescription>
            </Alert>
          )}

          <Button type="submit">{buttonText}</Button>
        </form>
      </Form>
    </div>
  );
}
