import { createElement, HTMLAttributes, ReactNode } from 'react';
import styles from './index.module.css';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'label';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold';
  truncate?: boolean;
  children: ReactNode;
}

export function Text({
  as = 'span',
  variant = 'primary',
  size = 'base',
  weight = 'normal',
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  const classNames = [
    styles.text,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`weight-${weight}`],
    truncate ? styles.truncate : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return createElement(
    as,
    { 'data-testid': 'text', className: classNames, ...props },
    children,
  );
}
