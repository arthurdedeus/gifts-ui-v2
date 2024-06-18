import styled from 'styled-components';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Image } from '../Image';
import { CartItemProps } from '@/types';
import { formatCurrency } from '@/utils';

const ItemContainer = styled.li`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProductContainer = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 125px;
  justify-content: space-between;
`;

const ProductName = styled.span`
  font-size: 16px;
  margin: 0;
  font-weight: 400;
  text-align: left;
`;

const ProductDescription = styled.span`
  font-size: 12px;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  font-weight: 300;
  text-align: left;
`;

const Price = styled.span`
  font-size: 12px;
  font-weight: 300;
`;

const QuantityContainer = styled.div`
  display: flex;
  padding-top: 5px;
  align-items: center;
`;

export const CheckoutCartItem = ({
  item,
  handleRemoveItem,
  handleUpdateQuantity,
}: CartItemProps) => {
  return (
    <ItemContainer key={item.id}>
      <Image src={item.image} alt={item.name} size="sm" />
      <ProductContainer>
        <ProductName>{item.name}</ProductName>
        <ProductDescription>{item.description}</ProductDescription>
        <Price>{formatCurrency(item.price * item.quantity)}</Price>
        <QuantityContainer>
          <Button
            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.name)}
            style={{ marginRight: '5px', width: '30px' }}
            text=" - "
          />
          <span>{item.quantity}</span>
          <Button
            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.name)}
            style={{ marginLeft: '5px', width: '30px' }}
            text="+"
          />
          <Icon
            name="delete"
            style={{ fontSize: '24px', cursor: 'pointer', marginLeft: '15px', color: 'gray' }}
            onClick={() => handleRemoveItem(item.id, item.name)}
          />
        </QuantityContainer>
      </ProductContainer>
    </ItemContainer>
  );
};
