import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { StripeMode } from '../stripe-config';

interface CheckoutOptions {
  priceId: string;
  mode: StripeMode;
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async ({ priceId, mode }: CheckoutOptions) => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const authHeader = session?.access_token
        ? `Bearer ${session.access_token}`
        : `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader,
          },
          body: JSON.stringify({
            priceId,
            mode,
            successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/pricing`,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed. Please try again.');
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return { startCheckout, loading, error };
}