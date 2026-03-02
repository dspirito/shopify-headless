"use client";
import { useState, useEffect } from 'react';

function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

function setCart(cart: any[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
}

export default function CartPage() {
  const [cart, setCartState] = useState<any[]>([]);

  useEffect(() => {
    setCartState(getCart());
  }, []);

  function removeFromCart(id: string) {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    setCartState(updated);
  }

  if (!cart.length) {
    return <main className="max-w-2xl mx-auto p-8"><h1 className="text-2xl font-bold mb-4">Cart</h1><p>Your cart is empty.</p></main>;
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <ul className="divide-y">
        {cart.map(item => (
          <li key={item.id} className="py-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-600">{item.price} {item.currency}</div>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">Remove</button>
          </li>
        ))}
      </ul>
      <div className="mt-6 font-bold">Total: {cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2)} {cart[0]?.currency}</div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Checkout</button>
    </main>
  );
}
