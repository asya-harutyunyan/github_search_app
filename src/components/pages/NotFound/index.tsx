import { Link } from 'react-router-dom';
import { Text } from '@/components/atoms';
import styles from './index.module.css';

export function NotFound() {
  return (
    <div data-testid="not-found" className={styles.container}>
      <Text as="h1" size="xl" weight="semibold">
        404
      </Text>
      <Text as="p" variant="secondary">
        Page not found
      </Text>
      <Link data-testid="not-found-link" to="/" className={styles.link}>
        <Text variant="link">Go back to search</Text>
      </Link>
    </div>
  );
}
