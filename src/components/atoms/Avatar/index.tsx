import styles from './index.module.css';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, alt, size = 'md' }: AvatarProps) {
  return (
    <img
      data-testid="avatar"
      className={`${styles.avatar} ${styles[size]}`}
      src={src}
      alt={alt}
      loading="lazy"
    />
  );
}
