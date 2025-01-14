import { createRoute, RouteConfig, z } from "@hono/zod-openapi";
import jsonContent from "../../helpers/json-content";
import { UserSchema } from "../user/models";

type RouteModel = Pick<RouteConfig, "request"> & Pick<RouteConfig, "responses">;

type AuthModels = Record<string, RouteModel>;

export const CheckEmailBody = z.object({
  email: z.string().email(),
});

export const CheckEmailResponse = z.object({
  exists: z.boolean(),
});

export const SignInBody = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignInResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: UserSchema,
});

export const SignUpBody = z
  .object({
    email: z.string().email(),
    password: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    phone_number: z.string(),
  })
  .openapi("SignUp");

export const SignUpResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: UserSchema,
});
