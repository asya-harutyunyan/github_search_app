import { memo } from 'react';
import { Text, Badge, Icon } from '@/components/atoms';
import { UserInfo, StatBadge } from '@/components/molecules';
import { formatNumber } from '@/utils/format';
import type { Repository } from '@/types';
import styles from './index.module.css';

interface RepoCardProps {
  repo: Repository;
}

export const RepoCard = memo(function RepoCard({ repo }: RepoCardProps) {
  return (
    <article data-testid="repo-card" className={styles.card}>
      <UserInfo avatarUrl={repo.owner.avatar_url} username={repo.owner.login} />

      <a
        data-testid="repo-card-link"
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.nameLink}
      >
        <Text as="h3" size="md" weight="semibold" variant="link">
          {repo.name}
        </Text>
      </a>

      {repo.description && (
        <Text
          data-testid="repo-card-description"
          as="p"
          size="sm"
          variant="secondary"
          truncate
        >
          {repo.description}
        </Text>
      )}

      <div className={styles.meta}>
        <div className={styles.stats}>
          <StatBadge
            icon="star"
            value={formatNumber(repo.stargazers_count)}
            label="Stars"
          />
          <StatBadge
            icon="fork"
            value={formatNumber(repo.forks_count)}
            label="Forks"
          />
          <StatBadge
            icon="issue"
            value={formatNumber(repo.open_issues_count)}
            label="Open issues"
          />
        </div>
        {repo.language && (
          <Badge variant="accent">{repo.language}</Badge>
        )}
      </div>

      <a
        data-testid="repo-card-external"
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.externalLink}
        aria-label={`Open ${repo.name} on GitHub`}
      >
        <Icon name="link" size={14} />
      </a>
    </article>
  );
});
