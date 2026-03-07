import { InputHTMLAttributes } from 'react';
import styles from './index.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export function Input({ fullWidth, className, ...props }: InputProps) {
  return (
    <input
      data-testid="input"
      className={`${styles.input} ${fullWidth ? styles.fullWidth : ''} ${className ?? ''}`}
      {...props}
    />
  );
}
