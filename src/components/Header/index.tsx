import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { pink } from '@/colors';
import { CartIcon } from '@/components/CartIcon';
import '@/components/Header/Header.css';
import { AppRoutes } from '@/enums';

type StyledHeaderProps = {
  isCheckout: boolean;
};

const StyledHeader = styled.header<StyledHeaderProps>`
  width: 100%;
  padding: 10px 10px;
  background-color: ${pink};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 60px;

  @media (max-width: 768px) {
    justify-content: ${({ isCheckout }) => (isCheckout ? 'flex-start' : 'space-between')};
  }
`;

type HeaderProps = {
  isCheckout?: boolean;
  handleCartIconClick?: () => void;
};

export const Header = ({ isCheckout = false, handleCartIconClick }: HeaderProps) => {
  const router = useRouter();
  const handletTitleClick = () => {
    router.push(AppRoutes.HOME);
  };

  return (
    <StyledHeader className="header" isCheckout={isCheckout}>
      <h1
        style={{ margin: 0, cursor: 'pointer', fontSize: '1.6rem', fontWeight: 300 }}
        onClick={handletTitleClick}
      >
        Presentes Carla e Arthur
      </h1>
      {!isCheckout && <CartIcon onClick={handleCartIconClick} />}
    </StyledHeader>
  );
};
