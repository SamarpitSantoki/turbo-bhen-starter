import { apiReference } from '@scalar/hono-api-reference';
import type { AppOpenAPI } from './types';

export default function configureOpenAPI(app: AppOpenAPI) {
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
