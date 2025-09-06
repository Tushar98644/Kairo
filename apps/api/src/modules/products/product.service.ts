import { db } from '../../db/client';
import { type NewProduct,type Product, products } from '../../db/schema/product';
import { eq, and, desc } from 'drizzle-orm';

export class ProductService {
  async create(productData: NewProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(productData)
      .returning();
    
    if (!newProduct) {
      throw new Error('Failed to create product');
    }
    
    return newProduct;
  }
  
  async getAll(): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.isAvailable, true))
      .orderBy(desc(products.createdAt));
  }

  async getById(id: string): Promise<Product> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
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
