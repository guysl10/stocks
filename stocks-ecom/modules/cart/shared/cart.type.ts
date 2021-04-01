export interface ICartItem {
  product: {
    name: string;
    size: string;
    imageUrl: string;
  };
  productId: string;
  productPrice: number;
  quantity: number;
  cartItemTotal: number;
}