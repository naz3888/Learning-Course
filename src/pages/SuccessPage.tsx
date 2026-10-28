import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ALL_PRODUCTS } from '../stripe-config';

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/pricing');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const isSubscription = ALL_PRODUCTS.find(
    (p) => p.mode === 'subscription'
  );

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <svg viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="url(#successGrad)" />
            <path
              d="M20 32L28 40L44 24"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="successGrad" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="success-title">Payment Successful!</h1>

        {sessionId ? (
          <p className="success-message">
            {isSubscription
              ? 'Your Provexa Learn Ai subscription is now active. Enjoy unlimited access to all courses.'
              : 'Your course purchase is confirmed. You now have lifetime access.'}
          </p>
        ) : (
          <p className="success-message">
            Your payment has been processed successfully. You can now access your content.
          </p>
        )}

        <div className="success-details">
          <div className="success-detail">
            <span className="success-detail__icon">✓</span>
            <span>Payment confirmed</span>
          </div>
          <div className="success-detail">
            <span className="success-detail__icon">✓</span>
            <span>Access granted immediately</span>
          </div>
          <div className="success-detail">
            <span className="success-detail__icon">✓</span>
            <span>Confirmation email sent</span>
          </div>
        </div>

        <button className="success-cta" onClick={() => navigate('/pricing')}>
          Back to Courses
        </button>

        <p className="success-redirect">
          Redirecting automatically in {countdown}s
        </p>
      </div>
    </div>
  );
}