import { shopifyFetch } from '../../shopify';

export default async function ProductsPage() {
  const query = `
    query Products {
      products(first: 12) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  let products = [];
  try {
    const data = await shopifyFetch(query);
    products = data.products.edges.map((edge: any) => edge.node);
  } catch (e) {
    return <div className="p-8 text-red-600">Failed to load products.</div>;
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: any) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center">
            {product.images.edges[0]?.node.url && (
              <img
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText || product.title}
                className="w-40 h-40 object-contain mb-4"
              />
            )}
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="mb-2">
              {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
            </p>
            <a href={`/products/${product.handle}`} className="text-blue-600 hover:underline">View Details</a>
          </div>
        ))}
      </div>
    </main>
  );
}
