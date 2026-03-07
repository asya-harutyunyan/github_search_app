import { Avatar, Text } from '@/components/atoms';
import styles from './index.module.css';

interface UserInfoProps {
  avatarUrl: string;
  username: string;
  size?: 'sm' | 'md';
}

export function UserInfo({ avatarUrl, username, size = 'sm' }: UserInfoProps) {
  return (
    <div data-testid="user-info" className={styles.userInfo}>
      <Avatar src={avatarUrl} alt={username} size={size} />
      <Text size="sm" variant="secondary">
        {username}
      </Text>
    </div>
  );
}
