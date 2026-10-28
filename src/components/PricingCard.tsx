import { useCheckout } from '../hooks/useCheckout';
import type { StripeProduct } from '../stripe-config';

interface PricingCardProps {
  product: StripeProduct;
  highlighted?: boolean;
}

export function PricingCard({ product, highlighted = false }: PricingCardProps) {
  const { startCheckout, loading, error } = useCheckout();

  const handleBuy = () => {
    startCheckout({ priceId: product.priceId, mode: product.mode });
  };

  const isSubscription = product.mode === 'subscription';

  return (
    <div className={`pricing-card ${highlighted ? 'pricing-card--highlighted' : ''}`}>
      {product.badge && (
        <div className="pricing-card__badge">{product.badge}</div>
      )}

      <div className="pricing-card__header">
        <h3 className="pricing-card__name">{product.name}</h3>
        <p className="pricing-card__description">{product.description}</p>
      </div>

      <div className="pricing-card__price">
        <span className="pricing-card__currency">{product.currency}</span>
        <span className="pricing-card__amount">{product.price.toFixed(0)}</span>
        {isSubscription && <span className="pricing-card__period">/mo</span>}
      </div>

      <ul className="pricing-card__features">
        {product.features.map((feature) => (
          <li key={feature} className="pricing-card__feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8L6.5 11.5L13 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {error && <p className="pricing-card__error">{error}</p>}

      <button
        className={`pricing-card__cta ${highlighted ? 'pricing-card__cta--primary' : ''} ${loading ? 'pricing-card__cta--loading' : ''}`}
        onClick={handleBuy}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner" />
            Processing...
          </>
        ) : isSubscription ? (
          'Subscribe Now'
        ) : (
          'Buy Course'
        )}
      </button>
    </div>
  );
}