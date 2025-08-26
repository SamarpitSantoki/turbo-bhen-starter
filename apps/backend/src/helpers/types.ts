import type { z } from '@hono/zod-openapi';

// eslint-disable-next-line ts/ban-ts-comment
export type ZodSchema =
  // @ts-expect-error
  z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
