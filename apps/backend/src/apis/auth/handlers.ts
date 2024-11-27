import { AppRouteHandler } from "../../lib/types";
import { CheckEmailRoute, SignInRoute, SignUpRoute } from "./routes";
import AuthService from "./service";

const checkEmailHandler: AppRouteHandler<CheckEmailRoute> = async (c) => {
  const params = await c.req.json();

  return c.json(await AuthService.checkEmail(params), 200);
};

const signInHandler: AppRouteHandler<SignInRoute> = async (c) => {
  const { email, password } = await c.req.json();

  try {
    return c.json(await AuthService.signIn({ email, password }), 200);
  } catch (error) {
    return c.json({ message: "Sign in failed" }, 400);
  }
};

const signUpHandler: AppRouteHandler<SignUpRoute> = async (c) => {
  const { email, password, first_name, last_name, phone_number } =
    await c.req.json();

  try {
    return c.json(
      await AuthService.signUp({
        email,
        password,
        first_name,
        last_name,
        phone_number,
      }),
      200
    );
  } catch (error) {
    return c.json({ message: "Sign up failed" }, 400);
  }
};

const authHandlers = {
  checkEmailHandler,
  signInHandler,
  signUpHandler,
};

export default authHandlers;
