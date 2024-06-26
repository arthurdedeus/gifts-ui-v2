import { StaticImageData } from 'next/image';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: StaticImageData;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartItemProps = {
  item: CartItem;
  handleRemoveItem: (id: number, name: string) => void;
  handleUpdateQuantity: (id: number, quantity: number, name: string) => void;
};

export interface CartState {
  items: CartItem[];
}
