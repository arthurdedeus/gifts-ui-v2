export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartItemProps = {
  item: CartItem;
  handleRemoveItem: (id: number, name: string) => void;
  handleUpdateQuantity: (id: number, quantity: number, name: string) => void;
};
