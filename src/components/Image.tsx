import styled from 'styled-components';

const BaseImage = styled.img<ImageProps>`
  border-radius: 10px;
  max-height: ${props => {
    switch (props.size) {
      case 'sm':
        return '125px';
      case 'md':
        return '200px';
      case 'lg':
        return '300px';
      default:
        return '200px';
    }
  }};
  width: auto;
`;

type ImageProps = {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
};

export const Image = ({ src, alt, ...props }: ImageProps) => {
  return <BaseImage src={src} alt={alt} {...props} />;
};
