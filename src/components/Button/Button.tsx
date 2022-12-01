import { ButtonHTMLAttributes, memo } from 'react';
import { Container } from './Button.styles';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: ButtonProps) => {
  return <Container {...rest}>{children}</Container>;
};

export default memo(Button);
