import { memo } from 'react';
import { Avatar, Text, Badge, Icon } from '@/components/atoms';
import type { User } from '@/types';
import styles from './index.module.css';

interface UserCardProps {
  user: User;
}

export const UserCard = memo(function UserCard({ user }: UserCardProps) {
  return (
    <article data-testid="user-card" className={styles.card}>
      <div className={styles.top}>
        <Avatar src={user.avatar_url} alt={user.login} size="lg" />
        <div className={styles.info}>
          <a
            data-testid="user-card-link"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nameLink}
          >
            <Text as="h3" size="md" weight="semibold" variant="link">
              {user.login}
            </Text>
          </a>
          <Badge>{user.type}</Badge>
        </div>
      </div>

      <div className={styles.footer}>
        <Text data-testid="user-card-score" size="xs" variant="tertiary">
          Score: {user.score.toFixed(1)}
        </Text>
        <a
          data-testid="user-card-profile"
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.profileLink}
        >
          <Icon name="link" size={14} />
          <Text size="xs" variant="link">
            Profile
          </Text>
        </a>
      </div>
    </article>
  );
});
