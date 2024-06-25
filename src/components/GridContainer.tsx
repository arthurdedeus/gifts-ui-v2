
import styled from 'styled-components';

import { ProductItem } from './ProductItem';
import bomba from '@/assets/images/bomba.jpeg'
import silvio from '@/assets/images/silvio.webp'
import passeio from '@/assets/images/passeio.webp'
import fofoca from '@/assets/images/fofoca.jpeg'
import engov from '@/assets/images/engov.webp'
import despedida from '@/assets/images/despedida.jpeg'
import noronha from '@/assets/images/noronha.jpeg'
import quarto from '@/assets/images/quarto.jpeg'
import louca from '@/assets/images/louca.jpeg'
import pobre from '@/assets/images/pobre.jpeg'
import buque from '@/assets/images/buque.jpeg'
import cafe from '@/assets/images/cafe.jpeg'
import capy from '@/assets/images/capy.jpeg'
import amigos from '@/assets/images/amigos.webp'
import mergulho from '@/assets/images/mergulho.jpg'
import netflix from '@/assets/images/netflix.jpeg'
import parente from '@/assets/images/parente.jpeg'
import aspirador from '@/assets/images/aspirador.jpeg'

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
  const data = [
    {
      id: 1,
      name: 'Taxa para a noiva não jogar o buquê no seu par',
      description: 'O risco é seu...',
      price: 9842,
      image: bomba,
    },
    {
      id: 2,
      name: 'Aviãozinho de 50 reais',
      description: 'Ma oeee',
      price: 5000,
      image: silvio,
    },
    {
      id: 3,
      name: 'Passeio na lua de mel',
      description: 'Ajude os noivos a bancar os passeios da lua de mel',
      price: 16408,
      image: passeio,
    },
    {
      id: 4,
      name: 'Falar mal da festa',
      description: 'Se não comprar, não pode reclamar!',
      price: 72419,
      image: fofoca,
    },
    {
      id: 5,
      name: 'Open Bar de Engov',
      description: 'Dispensa explicação',
      price: 6721,
      image: engov,
    },
    {
      id: 6,
      name: 'Patrocine as despedidas de solteiro',
      description: 'Para que as histórias sejam dignas de filme',
      price: 21478,
      image: despedida,
    },
    {
      id: 7,
      name: 'Acompanhar a Lua de Mel',
      description: 'Ida e volta com tudo pago para a lua de mel junto com os recém casados!',
      price: 50000000,
      image: noronha,
    },
    {
      id: 8,
      name: 'Prioridade no quarto de visitas',
      description: 'Garanta seu quarto para quando for visitar os noivos',
      price: 17690,
      image: quarto,
    },
    {
      id: 9,
      name: 'Máquina de lavar louça',
      description: 'Para substituir a atual, que é o Arthur',
      price: 230000,
      image: louca,
    },
    {
      id: 10,
      name: 'Só pra não dizerem que não dei nada',
      description: 'Deus tá vendo...',
      price: 1337,
      image: pobre,
    },
    {
      id: 11,
      name: 'Aumente suas chances de pegar o buquê',
      description: 'Sujeito à mira da Carla',
      price: 12301,
      image: buque,
    },
    {
      id: 12,
      name: 'Café da manhã pós corrida',
      description: 'Porque a melhor parte de correr é aquele café da manhã na padoca',
      price: 6412,
      image: cafe,
    },
    {
      id: 13,
      name: 'Filhote de Capivara',
      description: 'Um filhote de capivara para o noivo',
      price: 21489,
      image: capy,
    },
    {
      id: 14,
      name: 'Cota amigos para sempre',
      description: 'Seja amigo dos noivos para todo o sempre!',
      price: 7690,
      image: amigos,
    },
    {
      id: 15,
      name: 'Máscara de mergulho',
      description: 'Para os noivos não precisarem mais alugar quando forem mergulhar',
      price: 20000,
      image: mergulho,
    },
    {
      id: 16,
      name: '1 ano de Netflix',
      description: 'Para os noivos procrastinarem com qualidade',
      price: 53880,
      image: netflix,
    },
    {
      id: 17,
      name: 'Parente preferido',
      description: 'Ótima oportunidade para se tornar o parente preferido dos noivos!',
      price: 24289,
      image: parente,
    },
    {
      id: 18,
      name: 'Robô Aspirador',
      description: 'Para ajudar com (ou fazer toda) a limpeza da casa',
      price: 150000,
      image: aspirador,
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
