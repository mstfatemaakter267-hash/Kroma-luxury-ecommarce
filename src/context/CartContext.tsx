import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from './ToastContext';
import { PRODUCTS } from '../data/products';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string, openDrawer?: boolean) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartCount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  promoCode: string;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  promoError: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'kroma_cart_items';
const PROMO_STORAGE_KEY = 'kroma_applied_promo';
const FREE_SHIPPING_THRESHOLD = 300;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });
  const [promoError, setPromoError] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
      // Initialize with one high quality default item for immediate discovery
      const defaultProd = PRODUCTS[1]; // Sylvan Daypack & Weekender
      if (defaultProd) {
        return [{
          product: defaultProd,
          quantity: 1,
          selectedColor: defaultProd.colors[0]?.name
        }];
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync promo code', e);
    }
  }, [appliedPromo]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string,
    openDrawer = true
  ) => {
    const colorToUse = selectedColor || product.colors[0]?.name;
    const sizeToUse = selectedSize || product.sizes?.[0];

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === colorToUse &&
          item.selectedSize === sizeToUse
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, product.stockCount);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          product,
          quantity: Math.min(quantity, product.stockCount),
          selectedColor: colorToUse,
          selectedSize: sizeToUse
        }
      ];
    });

    showToast(`Added ${quantity}x "${product.name}" to bag`, 'success');
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (productId: string, selectedColor?: string, selectedSize?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
    showToast('Item removed from shopping bag', 'info');
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          const clamped = Math.min(quantity, item.product.stockCount);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyPromoCode = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    setPromoError(null);

    if (normalized === 'KROMA10' || normalized === 'ARCHITECT10') {
      setAppliedPromo('10% OFF Atelier Curation');
      showToast('Promo code applied: 10% discount', 'success');
      return true;
    }
    if (normalized === 'WELCOME50') {
      setAppliedPromo('$50 Welcome Privilege');
      showToast('Promo code applied: $50 discount', 'success');
      return true;
    }

    setPromoError('Invalid promo code. Try "KROMA10" or "WELCOME50".');
    showToast('Invalid promo code', 'error');
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
    showToast('Promo code removed', 'info');
  };

  // Calculations
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  let cartDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.includes('10%')) {
      cartDiscount = Math.round(cartSubtotal * 0.1);
    } else if (appliedPromo.includes('$50')) {
      cartDiscount = Math.min(50, cartSubtotal);
    }
  }

  const isEligibleForFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0;
  const cartShipping = isEligibleForFreeShipping ? 0 : 25;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        isCartOpen,
        setIsCartOpen,
        promoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        promoError
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
