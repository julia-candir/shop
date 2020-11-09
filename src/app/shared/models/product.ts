import { Category } from './category';

export interface Product {
  id: string;
  title: string,
  price: number,
  category: Category,
  imgUrl: string
}