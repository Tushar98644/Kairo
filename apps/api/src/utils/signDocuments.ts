import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { Story } from "../db/schema/stories";
import { s3 } from "../config/s3/client";

export async function generateSignedStories(
  stories: [],
  expiresIn = 3600
): Promise<(Story & { imageUrl: string })[]> {
  return Promise.all(
    stories.map(async (story) => {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: story.imageKey,
      });
      const imageUrl = await getSignedUrl(s3, command, { expiresIn });
      return { ...story, imageUrl };
    })
  );
}
