import { CartItemProps } from '../../types';
import { formatCurrency } from '../../utils';
import { Button } from '../Button';

export const DrawerCartItem = ({ item, handleRemoveItem, handleUpdateQuantity }: CartItemProps) => {
  return (
    <li
      key={item.id}
      style={{
        marginBottom: '15px',
      }}
    >
      <div>
        {item.name} - {formatCurrency(item.price)}
      </div>
      <div style={{ marginBottom: '5px' }}>Quantidade: {item.quantity}</div>
      <Button onClick={() => handleRemoveItem(item.id, item.name)} text="Remover" />
      <Button
        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
        style={{ width: '30px', margin: '0 2px 0 10px' }}
        text="-"
      />
      <Button
        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
        style={{ width: '30px' }}
        text="+"
      />
    </li>
  );
};
