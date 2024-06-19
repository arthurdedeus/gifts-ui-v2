import 'material-symbols';

type IconProps = {
  name: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const Icon = ({ name, onClick, style }: IconProps) => (
  <span className="material-symbols-outlined" onClick={onClick} style={style}>
    {name}
  </span>
);
