# Shopify Headless Next.js App

This project is a headless Shopify storefront built with Next.js, TypeScript, Tailwind CSS, and the Shopify Storefront API.

## Features

- Product listing page
- Product detail page
- Cart functionality
- Shopify Storefront API integration

## Getting Started

### 1. Prerequisites

- Node.js v18, v20, or >=22 (recommended)
- npm (latest recommended)
- A Shopify store with Storefront API enabled

### 2. Environment Variables

Create a `.env.local` file in the project root with the following:

```
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
```

Replace with your actual Shopify store domain and Storefront API token.

### 3. Install Dependencies

```
npm install
```

### 4. Run Locally

```
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

You can deploy this app to Vercel, Netlify, or any platform that supports Next.js. For Vercel:

1. Push your code to GitHub.
2. Import the repo in [Vercel](https://vercel.com/).
3. Set the environment variables in the Vercel dashboard.
4. Deploy!

## Next Steps

- Implement product listing, detail, and cart pages.
- Style with Tailwind CSS.
- Extend functionality as needed.

---

For more details, see the Next.js and Shopify Storefront API documentation.
