export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Headless Shopify Storefront</h1>
      <p className="mb-6">Browse our products and add them to your cart.</p>
      <a href="/products" className="text-blue-600 hover:underline text-lg">View Products</a>
    </main>
  );
}
