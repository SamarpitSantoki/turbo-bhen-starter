import type { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';

export default function configureOpenAPI(app: OpenAPIHono) {
  app.doc('/openapi', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Tasks API',
    },
  });

  app.get(
    '/docs',
    apiReference({
      theme: 'kepler',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      spec: {
        url: '/openapi',
      },
    })
  );
}
