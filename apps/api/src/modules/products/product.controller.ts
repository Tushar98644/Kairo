import { Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { productService } from "./product.service";
import { insertProductSchema } from "../../db/schema/product";

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const { userId } = getAuth(req);
      if (!userId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
      }

      const { emailAddresses } = await clerkClient.users.getUser(userId);
      const userEmail = emailAddresses[0]?.emailAddress;

      const productData = insertProductSchema.safeParse({
        ...req.body,
        sellerEmail: userEmail,
      });

      if (!productData.success) {
        res.status(400).json({
          message: "Invalid product data",
          errors: productData.error.issues,
        });
        return;
      }

      const newProduct = await productService.create(productData.data);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(400).json({ message: "Failed to create product" });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAll();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  };

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getById(id as string);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  };

  async getProductsByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      
      if (!category) {
        res.status(400).json({ message: "Category is required" });
        return;
      }
      
      const products = await productService.getByCategory(category);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  };
  
  async getProductsBySeller(req: Request, res: Response) {
    try {
      const { sellerEmail } = req.params;
      
      if (!sellerEmail) {
        res.status(400).json({ message: "Seller email is required" });
        return;
      }
      
      const products = await productService.getBySeller(sellerEmail);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  };
}

export const productController = new ProductController();
