import { db } from '../../db/client';
import { type NewProduct, type Product, products } from '../../db/schema/product';
import { eq, and, desc } from 'drizzle-orm';

export class ProductService {
  async create(productData: NewProduct): Promise<NewProduct> {
    const [newProduct] = await db
      .insert(products)
      .values(productData)
      .returning();
    
    return newProduct;
  }
  
  async getAll(): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.isAvailable, true))
      .orderBy(desc(products.createdAt));
  }

  async getById(id: string): Promise<Product | null> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    
    return product || null;
  }

  async getBySeller(sellerEmail: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.sellerEmail, sellerEmail))
      .orderBy(desc(products.createdAt));
  }

  async getByCategory(category: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(and(
        eq(products.category, category),
        eq(products.isAvailable, true)
      ))
      .orderBy(desc(products.createdAt));
  }
}

export const productService = new ProductService();
