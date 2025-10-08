import { NextResponse } from "next/server";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { s3Client } from "@/config/s3";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fileName, fileType } = await req.json();

    const randomBytes = crypto.randomBytes(16).toString("hex");
    const userEmail = user?.emailAddresses[0]?.emailAddress || "unknown-user";
    const key = `uploads/${userEmail}/${randomBytes}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    const getCommand = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
    });

    const signedViewUrl = await getSignedUrl(s3Client, getCommand, {
      expiresIn: 3600,
    });

    return NextResponse.json({ success: true, signedUrl, key, signedViewUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}
