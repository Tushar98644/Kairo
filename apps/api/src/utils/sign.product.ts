import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { Product } from "../db/schema/product";
import { s3 } from "../config/s3/client";

export async function generateSignedProducts(
  products: Product[],
  expiresIn = 3600
): Promise<(Product & { imageUrl: string })[]> {
  return Promise.all(
    products.map(async (product) => {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: product.imageKey,
      });
      const imageUrl = await getSignedUrl(s3, command, { expiresIn });
      return { ...product, imageUrl };
    })
  );
}
