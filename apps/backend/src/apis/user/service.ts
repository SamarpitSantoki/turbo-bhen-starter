import { z } from "zod";
import {
  CreateUserParams,
  CreateUserResponse,
  GetUserResponse,
  ListUserParams,
  ListUserResponse,
  UpdateUserParams,
  UpdateUserResponse,
} from "./models";
import { prisma } from "../../db/client";

export default class UserService {
  static async listUser(
    params: z.infer<typeof ListUserParams>
  ): Promise<z.infer<typeof ListUserResponse>> {
    const { page = 1, limit = 10, filter } = params;

    const filterObject = filter ? JSON.parse(filter) : {};

    const [userResources, total] = await Promise.all([
      prisma.user.findMany({
        where: filterObject,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({
        where: filterObject,
      }),
    ]);

    return {
      data: userResources,
      pagination: { page, limit, total },
    };
  }

  static async getUser(id: string): Promise<z.infer<typeof GetUserResponse>> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async createUser(
    params: z.infer<typeof CreateUserParams>
  ): Promise<z.infer<typeof CreateUserResponse>> {
    const user = await prisma.user
      .create({
        data: {
          ...params,
        },
      })
      .catch((error: any) => {
        throw new Error("Failed to create user", {
          cause: error.message,
        });
      });

    return user;
  }

  static async updateUser(
    id: string,
    params: z.infer<typeof UpdateUserParams>
  ): Promise<z.infer<typeof UpdateUserResponse>> {
    const user = await prisma.user
      .findUnique({
        where: { id },
      })
      .catch(() => {
        throw new Error("User not found", {
          cause: "USER_NOT_FOUND",
        });
      });

    if (!user) {
      throw new Error("User not found", {
        cause: "USER_NOT_FOUND",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: params,
    });

    return updatedUser;
  }
}
