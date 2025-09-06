import { Request, Response } from 'express';
import { clerkClient, getAuth } from '@clerk/express';
import { productService } from './product.service';
import { insertProductSchema } from '../../db/schema/product';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    
    const { emailAddresses } = await clerkClient.users.getUser(userId);
    const userEmail = emailAddresses[0]?.emailAddress;

    const productData = insertProductSchema.safeParse({
      ...req.body,
      sellerEmail: userEmail,
    });

    if (!productData.success) {
      res.status(400).json({ message: 'Invalid product data', errors: productData.error.issues });
      return;
    }

    const newProduct = await productService.create(productData.data);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: 'Failed to create product' });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getById(id as string);
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

export const getMyProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    
    const { emailAddresses } = await clerkClient.users.getUser(userId);
    const userEmail = emailAddresses[0]?.emailAddress as string;
    
    const products = await productService.getBySeller(userEmail);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching my products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const products = await productService.getByCategory(category as string);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};
