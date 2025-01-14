import { z } from "zod";

export const UploadResponse = z.object({
  url: z.string(),
  public_id: z.string(),
});

export const DeleteFileParams = z.object({
  public_id: z.string(),
});

export const DeleteFileResponse = z.object({
  success: z.boolean(),
});
