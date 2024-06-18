// import { useQuery } from 'react-query';

import styled from 'styled-components';

// import { getGifts } from '../api/gifts';
import { ProductItem } from './ProductItem';

const StyledGridContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: 20px;

  height: 100%;

  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

type GridContainerProps = {
  setIsDrawerOpen: (isOpen: boolean) => void;
};

export const GridContainer: React.FC<GridContainerProps> = ({ setIsDrawerOpen }) => {
  // const { data } = useQuery('gifts', getGifts);
  const data = [
    {
      id: 1,
      name: 'Gift 1',
      description: 'Description 1',
      price: 100,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Gift 2',
      description: 'Description 2',
      price: 200,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Gift 3',
      description: 'Description 3',
      price: 300,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Gift 4',
      description: 'Description 4',
      price: 400,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      name: 'Gift 5',
      description: 'Description 5',
      price: 500,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      name: 'Gift 6',
      description: 'Description 6',
      price: 600,
      image: 'https://via.placeholder.com/150',
    },
  ]


  return (
    <StyledGridContainer>
      {data.map(gift => (
        <ProductItem key={gift.id} product={gift} setIsDrawerOpen={setIsDrawerOpen} />
      ))}
    </StyledGridContainer>
  );
};
