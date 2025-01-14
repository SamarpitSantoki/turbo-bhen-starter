import { createRoute, RouteConfig, z } from "@hono/zod-openapi";

type RouteModel = {
  request: RouteConfig["request"];
  responses: RouteConfig["responses"];
};

type UserModels = Record<string, RouteModel>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(["ADMIN", "USER"]),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string().nullable(),
  image_url: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ListUserParams = z.object({
  page: z.coerce.number().optional().openapi("page", { default: 1 }),
  limit: z.coerce.number().optional().openapi("limit", { default: 10 }),
  filter: z.string().optional().openapi("filter"),
});

export const ListUserResponse = z.object({
  data: z.array(UserSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
  }),
});

export const GetUserQuery = z.object({
  id: z.string(),
});

export const GetUserResponse = UserSchema;

export const CreateUserParams = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["ADMIN", "USER"]),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string().optional(),
  image_url: z.string().optional(),
});

export const CreateUserResponse = UserSchema;

export const UpdateUserParams = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
  image_url: z.string().optional(),
});

export const UpdateUserResponse = UserSchema;
