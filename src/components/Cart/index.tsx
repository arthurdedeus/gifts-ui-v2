import { toast } from 'react-toastify';

import styled from 'styled-components';

import { CheckoutCartItem } from './CheckoutCartItem';
import { DrawerCartItem } from './DrawerCartItem';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type CartProps = {
  isCheckout?: boolean;
};

type CartItemListProps = CartProps;

const CartItemsList = styled.ul<CartItemListProps>`
  list-style-type: none;
  padding: 0 15px;
`;

export const Cart = ({ isCheckout = false }: CartProps) => {
  const { storedValue, removeItem, updateQuantity } = useLocalStorage('cart')

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id);
    toast.success(`${name} foi removido do carrinho!`);
  };

  const handleUpdateQuantity = (id: number, quantity: number, name: string) => {
    updateQuantity(id, quantity)

    if (quantity < 1) {
      toast.success(`${name} foi removido do carrinho!`);
      return
    }

    toast.success(`${name} atualizado!`);
  };

  const ItemComponent = isCheckout ? CheckoutCartItem : DrawerCartItem;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {storedValue.items.length === 0 && <p>Seu carrinho está vazio :(</p>}
      {storedValue.items.length >= 1 && (
        <CartItemsList isCheckout={isCheckout}>
          {storedValue.items.map(item => (
            <ItemComponent
              key={item.id}
              item={item}
              handleRemoveItem={handleRemoveItem}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </CartItemsList>
      )}
    </div>
  );
};
