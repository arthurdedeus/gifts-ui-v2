import React from 'react';

import { Icon } from './Icon';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type CartIconProps = {
  onClick?: () => void;
};

export const CartIcon = ({ onClick }: CartIconProps) => {
  const { storedValue } = useLocalStorage('cart')
  const itemCount = storedValue.items.reduce((total, item) => total + item.quantity, 0);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <span
      className="cart-icon"
      style={{ cursor: 'pointer', position: 'relative' }}
      onClick={handleClick}
    >
      <Icon name="shopping_cart" style={{ fontSize: '24px' }} />
      {itemCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '400',
          }}
        >
          {itemCount}
        </span>
      )}
    </span>
  );
};
