export interface Product {
  id: string;
  sellerEmail: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageKey: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  distance: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;  
}
