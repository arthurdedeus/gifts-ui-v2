import NextImage from 'next/image';

const heightMap = {
  sm: 125,
  md: 200,
  lg: 300,
}

type ImageProps = {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
};

export const Image = ({ src, alt, ...props }: ImageProps) => {
  const height = heightMap[props.size || 'md'];

  return <NextImage height={height} width={0} src={src} alt={alt} style={{ borderRadius: 10}} {...props} />;
};
