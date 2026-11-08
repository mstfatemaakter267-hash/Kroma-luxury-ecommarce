export type ProductCategory = 'furniture' | 'watches' | 'leather' | 'audio' | 'apparel';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  brand: string;
  rating: number;
  reviewCount: number;
  images: string[];
  inStock: boolean;
  stockCount: number;
  colors: { name: string; hex: string }[];
  sizes?: string[];
  specifications: Record<string, string>;
  features: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'apple-pay' | 'cod';
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

export interface FilterState {
  category: string;
  brand: string[];
  priceRange: [number, number];
  rating: number | null;
  inStockOnly: boolean;
  searchQuery: string;
}
