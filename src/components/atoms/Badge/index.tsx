import type { ReactNode } from 'react';
import styles from './index.module.css';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span data-testid="badge" className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  );
}
