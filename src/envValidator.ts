import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_NAME: z.string(),
  VITE_BASE_URL: z.string(),
  VITE_BASE_NAME: z.string(),
  VITE_GIT_COMMIT: z.string().optional(),
});

const validateEnv = () => envSchema.parse(import.meta.env);

export default validateEnv;
