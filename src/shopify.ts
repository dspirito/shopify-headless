// shopify.ts
// Utility for interacting with Shopify Storefront API

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = '2023-10';

if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
  throw new Error('Missing Shopify environment variables.');
}

export async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data;
}
