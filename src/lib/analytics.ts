import posthog from 'posthog-js';

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  posthog.init('PHG_XXXXXXXXXXXXXXXXXXXX', {
    api_host: 'https://app.posthog.com',
    // You can set any additional config here
  });
}
