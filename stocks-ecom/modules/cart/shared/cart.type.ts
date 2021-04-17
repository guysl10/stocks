import { Product } from '../../products/shared/product.type';

export interface ICartItem {
  product: Product;
  productId: string;
  productPrice: number;
  quantity: number;
  cartItemTotal: number;
}