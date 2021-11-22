import { ORDER_TYPE } from '../utils/constants';

export interface CartItem {
  productId: number;
  amount: number;
}

export interface PricedCartItem extends CartItem {
  price: number;
}

export interface CreateOrderDto {
  userId: number;
  type: ORDER_TYPE;
  items: CartItem[];
}