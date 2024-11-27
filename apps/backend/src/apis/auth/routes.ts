import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  CheckEmailBody,
  CheckEmailResponse,
  SignInBody,
  SignInResponse,
  SignUpBody,
  SignUpResponse,
} from "./models";
import AuthService from "./service";
import jsonContent from "../../helpers/json-content";
import errorContent from "../../helpers/error-content";

const checkEmailRoute = createRoute({
  method: "post",
  path: "/check",

  request: {
    body: jsonContent(CheckEmailBody, "Check Email Body"),
  },
  responses: {
    200: jsonContent(CheckEmailResponse, "Check Email Response"),
  },

  // responses: authModels.checkEmailParams.responses,
});

const signInRoute = createRoute({
  method: "post",
  path: "/sign-in",
  request: {
    body: jsonContent(SignInBody, "Sign In Body"),
  },
  responses: {
    200: jsonContent(SignInResponse, "Sign In Response"),
    400: errorContent,
  },
  tags: ["Auth"],
});

const signUpRoute = createRoute({
  method: "post",
  path: "/sign-up",
  request: {
    body: jsonContent(SignUpBody, "Sign Up Body"),
  },
  responses: {
    200: jsonContent(SignUpResponse, "Sign Up Response"),
    400: errorContent,
  },
  tags: ["Auth"],
});

const authRoutes = {
  checkEmailRoute,
  signInRoute,
  signUpRoute,
};

export default authRoutes;

export type CheckEmailRoute = typeof authRoutes.checkEmailRoute;
export type SignInRoute = typeof authRoutes.signInRoute;
export type SignUpRoute = typeof authRoutes.signUpRoute;
