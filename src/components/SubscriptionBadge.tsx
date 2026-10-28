import { useSubscription } from '../hooks/useSubscription';

export function SubscriptionBadge() {
  const { isActive, planName, loading } = useSubscription();

  if (loading || !isActive || !planName) return null;

  return (
    <span className="subscription-badge">
      <span className="subscription-badge__dot" />
      {planName}
    </span>
  );
}