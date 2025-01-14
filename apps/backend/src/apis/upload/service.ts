import { z } from "zod";
import cloudinary from "../../helpers/cloudinary";
import { DeleteFileParams, DeleteFileResponse, UploadResponse } from "./models";
import { UploadApiResponse } from "cloudinary";

export default class UploadService {
  static async uploadFile(
    file: Buffer,
    folder?: string
  ): Promise<z.infer<typeof UploadResponse>> {
    try {
      const result = (await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder || "uploads",
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result as UploadApiResponse);
          }
        );

        uploadStream.end(file);
      })) as UploadApiResponse;

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error: any) {
      throw new Error("Failed to upload file", {
        cause: error.message,
      });
    }
  }

  static async deleteFile(
    params: z.infer<typeof DeleteFileParams>
  ): Promise<z.infer<typeof DeleteFileResponse>> {
    try {
      await cloudinary.uploader.destroy(params.public_id);
      return { success: true };
    } catch (error: any) {
      throw new Error("Failed to delete file", {
        cause: error.message,
      });
    }
  }
}
