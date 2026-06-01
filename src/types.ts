/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Men' | 'Women' | 'Accessories' | 'Unisex';
  subcategory: string;
  description: string;
  details: string[];
  images: string[];
  sizes: string[];
  colors: { name: string; value: string }[];
  inventory: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (product id + size + color)
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; value: string };
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
}

export interface DiscountCoupon {
  code: string;
  type: 'percentage' | 'fixed_value' | 'free_shipping';
  value: number;
  minSpend?: number;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
}
