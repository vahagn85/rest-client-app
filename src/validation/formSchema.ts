import { z } from 'zod';
export const createFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email(t('INVALID_EMAIL')),
    password: z
      .string()
      .min(8, t('PASSWORD_MIN'))
      .regex(/[A-Za-z]/, t('PASSWORD_LETTER'))
      .regex(/\d/, t('PASSWORD_DIGIT'))
      .regex(/[^A-Za-z0-9]/, t('PASSWORD_SPECIAL')),
  });
