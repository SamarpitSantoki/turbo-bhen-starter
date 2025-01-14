import { createRoute, z } from "@hono/zod-openapi";
import { DeleteFileParams, DeleteFileResponse, UploadResponse } from "./models";
import jsonContent from "../../helpers/json-content";

const uploadFileRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    headers: z.object({
      "x-api-key": z.string(),
    }),
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            file: z.any(),
            folder: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: jsonContent(UploadResponse, "Upload File Response"),
    400: jsonContent(z.object({ cause: z.string() }), "Bad Request"),
  },
  tags: ["Upload"],
});

const deleteFileRoute = createRoute({
  method: "delete",
  path: "/",
  request: {
    headers: z.object({
      "x-api-key": z.string(),
    }),
    body: jsonContent(DeleteFileParams, "Delete File Request"),
  },
  responses: {
    200: jsonContent(DeleteFileResponse, "Delete File Response"),
    400: jsonContent(z.object({ cause: z.string() }), "Bad Request"),
  },
  tags: ["Upload"],
});

const uploadRoutes = {
  uploadFileRoute,
  deleteFileRoute,
};

export default uploadRoutes;

export type UploadFileRoute = typeof uploadFileRoute;
export type DeleteFileRoute = typeof deleteFileRoute;
