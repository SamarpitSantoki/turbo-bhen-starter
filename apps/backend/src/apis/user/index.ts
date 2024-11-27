import { createRouter } from "../../lib/create-app";
import userHandlers from "./handlers";
import userRoutes from "./routes";

const router = createRouter()
  .openapi(userRoutes.listUserRoute, userHandlers.listUserHandler)
  .openapi(userRoutes.getUserRoute, userHandlers.getUserHandler)
  .openapi(userRoutes.createUserRoute, userHandlers.createUserHandler)
  .openapi(userRoutes.updateUserRoute, userHandlers.updateUserHandler);

export default router;
