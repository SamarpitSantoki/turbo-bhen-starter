import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { auth } from '../../lib/auth';

export type AppBindings = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
