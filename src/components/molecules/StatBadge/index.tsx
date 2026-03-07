import { Icon, Text } from '@/components/atoms';
import type { IconName } from '@/components/atoms';
import styles from './index.module.css';

interface StatBadgeProps {
  icon: IconName;
  value: string;
  label?: string;
}

export function StatBadge({ icon, value, label }: StatBadgeProps) {
  return (
    <div data-testid={`stat-${icon}`} className={styles.statBadge} title={label}>
      <Icon name={icon} size={14} />
      <Text size="xs" variant="secondary">
        {value}
      </Text>
    </div>
  );
}
