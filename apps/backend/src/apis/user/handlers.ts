import { AppRouteHandler } from "../../lib/types";
import {
  CreateUserRoute,
  GetUserRoute,
  ListUserRoute,
  UpdateUserRoute,
} from "./routes";
import UserService from "./service";
import AuthHelper from "../../helpers/auth";

const listUserHandler: AppRouteHandler<ListUserRoute> = async (c) => {
  const { page, limit, filter } = c.req.valid("query");
  try {
    return c.json(await UserService.listUser({ page, limit, filter }), 200);
  } catch (error: any) {
    return c.json({ cause: error.cause }, 400);
  }
};

const getUserHandler: AppRouteHandler<GetUserRoute> = async (c) => {
  const { id } = c.req.valid("query");
  try {
    return c.json(await UserService.getUser(id), 200);
  } catch (error: any) {
    return c.json({ cause: error.cause }, 400);
  }
};

const createUserHandler: AppRouteHandler<CreateUserRoute> = async (c) => {
  const params = await c.req.json();
  try {
    const xApiKey = c.req.header("x-api-key");
    if (!xApiKey) {
      throw new Error("x-api-key header is required", {
        cause: "AUTHORIZATION_HEADER_REQUIRED",
      });
    }
    await AuthHelper.verifyToken(xApiKey).catch(() => {
      throw new Error("Invalid x-api-key header", {
        cause: "INVALID_API_KEY",
      });
    });

    return c.json(await UserService.createUser(params), 200);
  } catch (error: any) {
    return c.json({ cause: error.cause }, 400);
  }
};

const updateUserHandler: AppRouteHandler<UpdateUserRoute> = async (c) => {
  const { id } = c.req.param();
  const params = await c.req.json();

  try {
    const xApiKey = c.req.header("x-api-key");
    if (!xApiKey) {
      throw new Error("x-api-key header is required", {
        cause: "AUTHORIZATION_HEADER_REQUIRED",
      });
    }

    await AuthHelper.verifyToken(xApiKey).catch(() => {
      throw new Error("Invalid x-api-key header", {
        cause: "INVALID_API_KEY",
      });
    });

    return c.json(await UserService.updateUser(id, params), 200);
  } catch (error: any) {
    return c.json({ cause: error.cause }, 400);
  }
};

const userHandlers = {
  listUserHandler,
  getUserHandler,
  createUserHandler,
  updateUserHandler,
};

export default userHandlers;
