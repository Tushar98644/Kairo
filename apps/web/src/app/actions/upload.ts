"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToS3(file: File) {
  if (!file) {
    return { success: false, error: "No file provided" };
  }

  const key = `uploads/${Date.now()}-${file.name}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: buffer,
    ContentType: file.type,
  });
  
  try {
    await s3.send(command);

    return { success: true, key };
  } catch (error) {
    console.error("S3 Upload Error:", error);
    return { success: false, error: "Upload failed" };
  }
}
