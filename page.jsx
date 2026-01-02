// /app/page.jsx — FULL READY-TO-PASTE EL DUCE WEBSITE

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Instagram, Plus, Minus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ElDuceWebsite() {
  const initialProducts = [
    { id: 1, name: 'El DUCE Signature Hoodie', price: 90, stock: 20 },
    { id: 2, name: 'El DUCE Essential Tee', price: 45, stock: 35 },
    { id: 3, name: 'El DUCE Street Pants', price: 110, stock: 15 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [adminMode, setAdminMode] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, amount) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + amount } : p).filter(p => p.qty > 0));
  };

  const cartTotal = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  const addProductAdmin = (name, price, stock) => {
    setProducts(prev => [...prev, { id: Date.now(), name, price: Number(price), stock: Number(stock) }]);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-widest">EL DUCE</h1>
        <div className="flex gap-6 items-center">
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <button onClick={() => setAdminMode(!adminMode)} className="text-sm opacity-70">
            {adminMode ? 'Exit Admin' : 'Admin'}
          </button>
          <ShoppingBag />
        </div>
      </nav>

      {/* Hero */}
      <section className="h-[80vh] flex items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-6xl font-extrabold mb-6">POWER. STYLE. EL DUCE.</h2>
          <p className="text-white/70 mb-8">Luxury streetwear engineered for dominance.</p>
          <Button className="rounded-2xl px-8 py-6 text-lg">Shop Collection</Button>
        </motion.div>
      </section>

      {/* Shop */}
      <section id="shop" className="px-8 py-20">
        <h3 className="text-3xl font-bold mb-10">Shop</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map(product => (
            <Card key={product.id} className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <div className="h-48 bg-white/10 rounded-xl mb-4" />
                <h4 className="text-xl font-semibold">{product.name}</h4>
                <p className="text-white/70">${product.price} CAD</p>
                <p className="text-sm opacity-60 mb-4">Stock: {product.stock}</p>
                <Button onClick={() => addToCart(product)} className="rounded-xl">Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cart */}
      <section className="px-8 py-16 bg-white/5">
        <h3 className="text-2xl font-bold mb-6">Cart</h3>
        {cart.length === 0 && <p className="opacity-60">Your cart is empty.</p>}
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <span>{item.name}</span>
            <div className="flex items-center gap-2">
              <Minus onClick={() => updateQty(item.id, -1)} className="cursor-pointer" />
              <span>{item.qty}</span>
              <Plus onClick={() => updateQty(item.id, 1)} className="cursor-pointer" />
              <Trash2 onClick={() => updateQty(item.id, -item.qty)} className="cursor-pointer" />
            </div>
          </div>
        ))}
        {cart.length > 0 && (
          <div className="mt-6">
            <p className="mb-4">Total: ${cartTotal} CAD</p>
            <Button className="rounded-xl">Checkout (Stripe Ready)</Button>
          </div>
        )}
      </section>

      {/* Admin Dashboard */}
      {adminMode && (
        <section className="px-8 py-20 border-t border-white/10">
          <h3 className="text-2xl font-bold mb-6">Admin Dashboard</h3>
          <AdminPanel onAdd={addProductAdmin} />
        </section>
      )}

      {/* About */}
      <section id="about" className="px-8 py-20">
        <h3 className="text-3xl font-bold mb-6">About El DUCE</h3>
        <p className="max-w-2xl text-white/70">
          El DUCE is a luxury streetwear brand rooted in power, discipline, and elite presence.
          Every piece is designed to command respect the moment you step into a room.
        </p>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 border-t border-white/10 flex justify-between items-center">
        <p className="opacity-60">© {new Date().getFullYear()} El DUCE</p>
        <Instagram className="cursor-pointer" />
      </footer>
    </div>
  );
}

function AdminPanel({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  return (
    <div className="max-w-md space-y-4">
      <Input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
      <Input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <Input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
      <Button onClick={() => onAdd(name, price, stock)} className="rounded-xl">Add Product</Button>
    </div>
  );
}
