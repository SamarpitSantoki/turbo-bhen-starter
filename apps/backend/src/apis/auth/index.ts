import { createRouter } from "../../lib/create-app";
import authHandlers from "./handlers";
import authRoutes from "./routes";

const router = createRouter()
  .openapi(authRoutes.checkEmailRoute, authHandlers.checkEmailHandler)
  .openapi(authRoutes.signInRoute, authHandlers.signInHandler)
  .openapi(authRoutes.signUpRoute, authHandlers.signUpHandler);

export default router;
