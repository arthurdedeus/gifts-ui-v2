import { lightPink, pink } from '@/colors';
import { ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';


const BaseButton = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  border: 0;
  border-radius: 5px;
  background-color: ${pink};
  color: #fff;
  padding: 5px 10px;
  font-size: 0.9rem;
  font-weight: 300;

  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
    background-color: ${lightPink};
  }
`;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button = ({ text, ...props }: ButtonProps) => {
  return <BaseButton {...props}>{text}</BaseButton>;
};
