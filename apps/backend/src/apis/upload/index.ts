import { createRouter } from "../../lib/create-app";
import uploadHandlers from "./handlers";
import uploadRoutes from "./routes";

const router = createRouter()
  .openapi(uploadRoutes.uploadFileRoute, uploadHandlers.uploadFileHandler)
  .openapi(uploadRoutes.deleteFileRoute, uploadHandlers.deleteFileHandler);

export default router;
