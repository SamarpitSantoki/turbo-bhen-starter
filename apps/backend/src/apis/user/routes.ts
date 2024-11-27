import { createRoute, z } from "@hono/zod-openapi";
import {
  GetUserQuery,
  GetUserResponse,
  ListUserParams,
  ListUserResponse,
  CreateUserParams,
  CreateUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
} from "./models";
import jsonContent from "../../helpers/json-content";

const listUserRoute = createRoute({
  method: "get",
  path: "/",
  request: {
    headers: z.object({
      "x-api-key": z.string(),
    }),
    query: ListUserParams,
  },
  responses: {
    200: jsonContent(ListUserResponse, "List User Response"),
    400: jsonContent(z.object({ cause: z.string() }), "Bad Request"),
  },
  tags: ["User"],
});

const getUserRoute = createRoute({
  method: "get",
  path: "/{id}",
  request: {
    headers: z.object({
      "x-api-key": z.string(),
    }),
    query: GetUserQuery,
  },
  responses: {
    200: jsonContent(GetUserResponse, "Get User Response"),
    400: jsonContent(z.object({ cause: z.string() }), "Bad Request"),
  },
  tags: ["User"],
});

const createUserRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    headers: z.object({
      "x-api-key": z.string(),
    }),
    body: jsonContent(CreateUserParams, "Create User Request"),
  },
  responses: {
    200: jsonContent(CreateUserResponse, "Create User Response"),
    400: jsonContent(z.object({ cause: z.string() }), "Bad Request"),
  },
  tags: ["User"],
});

const updateUserRoute = createRoute({
  method: "put",
  path: "/{id}",
  request: {
    headers: z.object({
      "x-api-key": z.string(),
    }),
    body: jsonContent(UpdateUserParams, "Update User Request"),
  },
  responses: {
    200: jsonContent(UpdateUserResponse, "Update User Response"),
    400: jsonContent(z.object({ cause: z.string() }), "Bad Request"),
  },
  tags: ["User"],
});

const userRoutes = {
  listUserRoute,
  getUserRoute,
  createUserRoute,
  updateUserRoute,
};

export default userRoutes;

export type ListUserRoute = typeof listUserRoute;
export type GetUserRoute = typeof getUserRoute;
export type CreateUserRoute = typeof createUserRoute;
export type UpdateUserRoute = typeof updateUserRoute;
