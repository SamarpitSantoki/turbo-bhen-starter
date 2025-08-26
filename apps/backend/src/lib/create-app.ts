import { OpenAPIHono } from '@hono/zod-openapi';
import type { AppBindings, AppOpenAPI } from './types';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: true,
  });
}

export default function createApp() {
  const app = createRouter();

  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
}
