"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  product_id: number;
  title: string;
  price_cents: number;
  quantity: number;
  max_quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (product_id: number) => void;
  updateQuantity: (product_id: number, quantity: number) => void;
  clear: () => void;
  totalCents: number;
  totalCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aandb-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage once on mount (client-only — cart shouldn't leak
  // across devices/sessions, just persist through page reloads on this one).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // corrupted storage — start fresh rather than crashing the page
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === item.product_id);
      if (existing) {
        const nextQty = Math.min(existing.quantity + 1, existing.max_quantity);
        return prev.map((i) => (i.product_id === item.product_id ? { ...i, quantity: nextQty } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Adding an item opens the drawer immediately — the person shouldn't have
    // to go hunt for a "View Cart" link to see what just happened.
    setIsOpen(true);
  }

  function removeItem(product_id: number) {
    setItems((prev) => prev.filter((i) => i.product_id !== product_id));
  }

  function updateQuantity(product_id: number, quantity: number) {
    setItems((prev) =>
      prev
        .map((i) => (i.product_id === product_id ? { ...i, quantity: Math.max(1, Math.min(quantity, i.max_quantity)) } : i))
        .filter((i) => i.quantity > 0)
    );
  }

  function clear() {
    setItems([]);
  }

  const totalCents = items.reduce((sum, i) => sum + i.price_cents * i.quantity, 0);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        totalCents,
        totalCount,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((v) => !v),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
