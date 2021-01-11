import { Product } from './product';

export interface Cart {
  product: Product;
  quantity: number;
}