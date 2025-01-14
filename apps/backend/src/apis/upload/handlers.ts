import { AppRouteHandler } from "../../lib/types";
import { DeleteFileRoute, UploadFileRoute } from "./routes";
import UploadService from "./service";
import AuthHelper from "../../helpers/auth";

const uploadFileHandler: AppRouteHandler<UploadFileRoute> = async (c) => {
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

    const body = await c.req.parseBody();
    console.log(body);

    const file = body["file"] as File;
    const folder = body["folder"] as string;

    if (!file) {
      throw new Error("No file provided", {
        cause: "FILE_REQUIRED",
      });
    }

    const buffer = await file.arrayBuffer();
    const result = await UploadService.uploadFile(Buffer.from(buffer), folder);

    return c.json(result, 200);
  } catch (error: any) {
    return c.json({ cause: error.cause }, 400);
  }
};

const deleteFileHandler: AppRouteHandler<DeleteFileRoute> = async (c) => {
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

    const params = await c.req.json();
    const result = await UploadService.deleteFile(params);

    return c.json(result, 200);
  } catch (error: any) {
    return c.json({ cause: error.cause }, 400);
  }
};

const uploadHandlers = {
  uploadFileHandler,
  deleteFileHandler,
};

export default uploadHandlers;
