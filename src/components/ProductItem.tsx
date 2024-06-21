import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styled from 'styled-components';

import { Product } from '../types';
import { formatCurrency } from '../utils';
import { Button } from './Button';
import { Image } from './Image';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type ProductItemProps = {
  product: Product;
  setIsDrawerOpen: (isOpen: true) => void;
};

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  background-color: white;
  max-height: 400px;

  @media (max-width: 768px) {
    margin: 2px;
    & h2 {
      font-size: 1.2rem;
    }
  }
`;

export const ProductItem: React.FC<ProductItemProps> = ({ product, setIsDrawerOpen }) => {
  const { addItem } = useLocalStorage('cart')

  const handleAddToCart = () => {
    toast.success(`${product.name} adicionado ao carrinho!`);
    setIsDrawerOpen(true);
    addItem(product)
  };

  return (
    <Item>
      <Image src={product.image} alt={product.name} size="sm" />
      <h2 style={{ marginBottom: 0 }}>{product.name}</h2>
      <p style={{ marginTop: '5px', }}>{product.description}</p>
      <div>
        <p style={{ marginBottom: '5px', }}>{formatCurrency(product.price)}</p>
        <Button text="Adicionar ao carrinho" onClick={handleAddToCart} />
      </div>
    </Item>
  );
};
