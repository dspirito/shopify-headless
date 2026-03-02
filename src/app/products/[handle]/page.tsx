"use client";
import { useState, useEffect } from 'react';
import { shopifyFetch } from '../../../shopify';
import { notFound } from 'next/navigation';

interface ProductDetailProps {
  params: { handle: string };
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const query = `
        query ProductByHandle($handle: String!) {
          productByHandle(handle: $handle) {
            id
            title
            descriptionHtml
            images(first: 4) {
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
      `;
      try {
        const data = await shopifyFetch(query, { handle: params.handle });
        if (!data.productByHandle) {
          setError('Product not found');
        } else {
          setProduct(data.productByHandle);
        }
      } catch (e) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.handle]);

  function addToCart() {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.find((item: any) => item.id === product.id);
    if (!exists) {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.priceRange.minVariantPrice.amount,
        currency: product.priceRange.minVariantPrice.currencyCode,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-6">
        <div className="flex-1 flex flex-wrap gap-4">
          {product.images.edges.map((img: any, i: number) => (
            <img
              key={i}
              src={img.node.url}
              alt={img.node.altText || product.title}
              className="w-48 h-48 object-contain border rounded"
            />
          ))}
        </div>
        <div className="flex-1">
          <div className="text-xl font-semibold mb-2">
            {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
          </div>
          <div
            className="prose mb-4"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            onClick={addToCart}
            disabled={added}
          >
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </main>
  );
}
