import { z } from "zod";
import {
  CheckEmailBody,
  CheckEmailResponse,
  SignInBody,
  SignInResponse,
  SignUpBody,
  SignUpResponse,
} from "./models";
import { prisma } from "../../db/client";
import AuthHelper from "../../helpers/auth";

export default class AuthService {
  static async checkEmail(
    params: z.infer<typeof CheckEmailBody>
  ): Promise<z.infer<typeof CheckEmailResponse>> {
    const { email } = params;

    const sanitizedEmail = email.toLowerCase().trim();

    const exists = await prisma.user.findUnique({
      where: {
        email: sanitizedEmail,
      },
    });

    return {
      exists: exists ? true : false,
    };
  }

  static async signIn(
    params: z.infer<typeof SignInBody>
  ): Promise<z.infer<typeof SignInResponse>> {
    // Implementation for signing in
    const { email, password } = params;

    const sanitizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });

    if (!user) {
      throw new Error("User not found", {
        cause: "USER_NOT_FOUND",
      });
    }

    console.log(user.password, password);

    const isPasswordValid = await AuthHelper.compare(
      password,
      user.password
    ).catch(() => false);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials", {
        cause: "INVALID_CREDENTIALS",
      });
    }

    const token = await AuthHelper.signToken({
      id: user.id,
      email: user.email,
    });

    return {
      access_token: token,
      refresh_token: token,
      user,
    };
  }

  static async signUp(
    params: z.infer<typeof SignUpBody>
  ): Promise<z.infer<typeof SignUpResponse>> {
    // Implementation for signing up
    const { email, password, first_name, last_name, phone_number } = params;

    const sanitizedEmail = email.toLowerCase().trim();

    const isEmailAlreadyTaken = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
    });

    if (isEmailAlreadyTaken) {
      throw new Error("Email already taken", {
        cause: "EMAIL_ALREADY_TAKEN",
      });
    }

    const hashedPassword = await AuthHelper.hash(password);

    console.log(hashedPassword);

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        phone_number,
        role: "USER",
        email: sanitizedEmail,
        password: hashedPassword,
      },
    });

    const access_token = await AuthHelper.signToken({
      id: user.id,
      email: user.email,
    });

    const refresh_token = await AuthHelper.signToken({
      id: user.id,
      email: user.email,
    });

    return {
      access_token,
      refresh_token,
      user,
    };
  }
}
