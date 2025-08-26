import { OpenAPIHono } from '@hono/zod-openapi';
import configureOpenAPI from './lib/openapi';

const app = new OpenAPIHono();

app.use(async (c, next) => {
  console.log(`got request to ${c.req.path}`);
  await next();
  console.log(`finished request to ${c.req.path}`);

  if (c.error) {
    return c.json(
      {
        error: c.error.message,
      },
      500
    );
  }
});

const routes = app;

configureOpenAPI(app);

console.log(
  'Hono is running on port http://localhost:' + Bun.env.PORT + '/docs'
);

export default {
  fetch: app.fetch,
  port: Bun.env.PORT,
};

export type AppType = typeof routes;
