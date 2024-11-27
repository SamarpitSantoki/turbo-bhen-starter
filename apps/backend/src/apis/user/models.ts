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
  role: z.enum(["ADMIN", "DISTRIBUTOR", "GARAGE_OWNER"]),
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string().optional(),
  image_url: z.string().optional(),
});

export const CreateUserResponse = UserSchema;

export const UpdateUserParams = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  role: z.enum(["ADMIN", "DISTRIBUTOR", "GARAGE_OWNER"]).optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
  image_url: z.string().optional(),
});

export const UpdateUserResponse = UserSchema;

const userModels: UserModels = {
  getUserQuery: {
    request: {
      headers: z.object({
        "x-api-key": z.string(),
      }),
      query: GetUserQuery,
    },
    responses: {
      200: {
        description: "User resource",
        content: {
          "application/json": {
            schema: GetUserResponse.openapi("User"),
          },
        },
      },
    },
  },
  listUserParams: {
    request: {
      headers: z.object({
        "x-api-key": z.string(),
      }),
      query: ListUserParams,
    },
    responses: {
      200: {
        description: "List of user resources",
        content: {
          "application/json": {
            schema: ListUserResponse,
          },
        },
      },
    },
  },
  createUserParams: {
    request: {
      headers: z.object({
        "x-api-key": z.string(),
      }),
      body: {
        content: {
          "application/json": {
            schema: CreateUserParams.openapi("User"),
          },
        },
      },
    },
    responses: {
      200: {
        description: "User resource created",
        content: {
          "application/json": {
            schema: CreateUserResponse,
          },
        },
      },
    },
  },
  updateUserParams: {
    request: {
      headers: z.object({
        "x-api-key": z.string(),
      }),
      params: GetUserQuery,
      body: {
        content: {
          "application/json": {
            schema: UpdateUserParams.openapi("User"),
          },
        },
      },
    },
    responses: {
      200: {
        description: "User resource updated",
        content: {
          "application/json": {
            schema: UpdateUserResponse,
          },
        },
      },
    },
  },
};

export default userModels;
