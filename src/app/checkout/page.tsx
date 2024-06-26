'use client';

import styled from 'styled-components';

import { Cart } from '@/components/Cart';
import { CheckoutForm } from '@/components/CheckoutForm';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { formatCurrency } from '@/utils';

const CartReviewContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  width: 100%;
  margin-top: 5px;

  background-color: #ffffff;
`;

const CheckoutContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

export default function Checkout() {
  const { totalPrice } = useLocalStorage('cart');

  return (
    <CheckoutContainer>
      <Header isCheckout />
      <CartReviewContainer>
        <Cart isCheckout={true} />
      </CartReviewContainer>
      <Footer
        style={{
          marginBottom: '80px',
          width: '100%',
          height: '40%',
          padding: '5px',
          overflowY: 'auto',
        }}
      >
        <div>
          <h3 style={{ margin: '10px' }}>Total: {formatCurrency(totalPrice)}</h3>
        </div>
        <CheckoutForm />
      </Footer>
    </CheckoutContainer>
  );
}
