import { PricingCard } from '../components/PricingCard';
import { SubscriptionBadge } from '../components/SubscriptionBadge';
import { COURSE_PRODUCTS, SUBSCRIPTION_PRODUCT } from '../stripe-config';

export function PricingPage() {
  return (
    <div className="pricing-page">
      <header className="pricing-header">
        <div className="pricing-header__inner">
          <div className="pricing-header__logo">
            <span className="logo-mark">P</span>
            <span className="logo-text">Provexa Learn</span>
          </div>
          <SubscriptionBadge />
        </div>
      </header>

      <main className="pricing-main">
        <section className="pricing-hero">
          <h1 className="pricing-hero__title">
            Invest in Your <span className="gradient-text">Future</span>
          </h1>
          <p className="pricing-hero__subtitle">
            Choose a course that fits your goals, or unlock everything with our AI subscription plan.
          </p>
        </section>

        <section className="pricing-section">
          <div className="pricing-section__label">
            <span>⚡ Recommended</span>
          </div>
          <div className="subscription-spotlight">
            <PricingCard product={SUBSCRIPTION_PRODUCT} highlighted />
          </div>
        </section>

        <section className="pricing-section">
          <div className="pricing-section__label">
            <span>Individual Courses</span>
          </div>
          <div className="courses-grid">
            {COURSE_PRODUCTS.map((product) => (
              <PricingCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}