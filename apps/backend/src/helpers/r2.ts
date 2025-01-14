import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

export async function uploadToR2(file: File, key: string) {
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    // Add reasonable timeouts
    requestHandler: {
      abortSignal: AbortSignal.timeout(15000), // 15 second timeout
    },
  });

  try {
    // Convert File to Buffer properly
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    const result = await client.send(command);

    if (
      !result.$metadata.httpStatusCode ||
      result.$metadata.httpStatusCode !== 200
    ) {
      throw new Error(
        `Upload failed with status ${result.$metadata.httpStatusCode}`
      );
    }

    return result;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw error;
  }
}
