export type StripeMode = 'payment' | 'subscription';

export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  currencyCode: string;
  mode: StripeMode;
  features: string[];
  badge?: string;
}

export const COURSE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_VWYHDuSrjLNpbm',
    priceId: 'price_1UVVAwFy9ycAEbdsbykqn6aH',
    name: 'Course Essentials',
    description: 'Begin your learning journey with core fundamentals.',
    price: 79.00,
    currency: 'RM',
    currencyCode: 'myr',
    mode: 'payment',
    features: ['Lifetime access', 'Completion certificate', 'Community support'],
  },
  {
    id: 'prod_VWYGnXbfO1UOGW',
    priceId: 'price_1UVVA2Fy9ycAEbdsNSYQS27q',
    name: 'Course Starter',
    description: 'A curated entry-level course for aspiring learners.',
    price: 79.00,
    currency: 'RM',
    currencyCode: 'myr',
    mode: 'payment',
    features: ['Lifetime access', 'Completion certificate', 'Community support'],
  },
  {
    id: 'prod_VWYGQ48dRRFRvG',
    priceId: 'price_1UVV9pFy9ycAEbdsFbzWdAst',
    name: 'Course Standard',
    description: 'Elevate your skills with structured, hands-on content.',
    price: 89.00,
    currency: 'RM',
    currencyCode: 'myr',
    mode: 'payment',
    features: ['Lifetime access', 'Completion certificate', 'Community support', 'Practical projects'],
  },
  {
    id: 'prod_VWYEapBuFeoos1',
    priceId: 'price_1UVV8UFy9ycAEbdsiODnjVsv',
    name: 'Course Professional',
    description: 'For professionals ready to accelerate their growth.',
    price: 129.00,
    currency: 'RM',
    currencyCode: 'myr',
    mode: 'payment',
    features: ['Lifetime access', 'Completion certificate', '1-on-1 mentorship session', 'Practical projects'],
  },
  {
    id: 'prod_VWYF3g3NP1fcpK',
    priceId: 'price_1UVV9RFy9ycAEbdsIQrvqcOC',
    name: 'Course Advanced',
    description: 'Master advanced techniques and industry best practices.',
    price: 189.00,
    currency: 'RM',
    currencyCode: 'myr',
    mode: 'payment',
    features: ['Lifetime access', 'Completion certificate', 'Personal mentorship', 'Advanced projects', 'Premium community access'],
  },
  {
    id: 'prod_VWYHMJvtAjLABd',
    priceId: 'price_1UVVAjFy9ycAEbdsxPcVRCXV',
    name: 'Course Elite',
    description: 'The most comprehensive package for serious learners.',
    price: 269.00,
    currency: 'RM',
    currencyCode: 'myr',
    mode: 'payment',
    features: ['Lifetime access', 'Completion certificate', 'Exclusive mentorship', 'All projects included', 'VIP community access', 'Content updates'],
    badge: 'Most Complete',
  },
];

export const SUBSCRIPTION_PRODUCT: StripeProduct = {
  id: 'prod_VWYAKZdyj0dQJK',
  priceId: 'price_1UVV4LFy9ycAEbdszZVYk3go',
  name: 'Provexa Learn Ai',
  description: 'Unlimited access to all Provexalearn courses in one subscription.',
  price: 49.00,
  currency: 'RM',
  currencyCode: 'myr',
  mode: 'subscription',
  features: [
    'All courses included',
    'Unlimited access',
    'Latest content updates',
    'Priority support',
    'Certificates for all courses',
  ],
  badge: 'Best Value',
};

export const ALL_PRODUCTS: StripeProduct[] = [...COURSE_PRODUCTS, SUBSCRIPTION_PRODUCT];