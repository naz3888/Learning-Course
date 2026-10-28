import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SUBSCRIPTION_PRODUCT } from '../stripe-config';

interface UserSubscription {
  subscription_id: string | null;
  subscription_status: string | null;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean | null;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .maybeSingle();

    if (!error) {
      setSubscription(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscription();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(() => {
      setLoading(true);
      fetchSubscription();
    });

    return () => authListener?.unsubscribe();
  }, []);

  const isActive =
    subscription?.subscription_status === 'active' ||
    subscription?.subscription_status === 'trialing';

  const planName = isActive ? SUBSCRIPTION_PRODUCT.name : null;

  return { subscription, loading, isActive, planName };
}