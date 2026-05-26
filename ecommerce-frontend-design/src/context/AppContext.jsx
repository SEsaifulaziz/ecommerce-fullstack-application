import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../api/auth';
import { createProduct, fetchFilteredProducts, fetchProductById } from '../api/products';

const AppContext = createContext(null);

const CART_STORAGE_KEY = 'ecommerce_cart';

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadUserFromStorage() {
  try {
    const raw = localStorage.getItem('authUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(loadUserFromStorage);
  const [cart, setCart] = useState(loadCartFromStorage);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!selectedProductId) {
      setSelectedProduct(null);
      return;
    }

    let cancelled = false;

    fetchProductById(selectedProductId)
      .then((product) => {
        if (!cancelled) setSelectedProduct(product);
      })
      .catch(() => {
        if (!cancelled) setSelectedProduct(null);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedProductId]);

  const login = useCallback(async (username, password) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await loginUser({ username, password });
      localStorage.setItem('authToken', response.token);
      const authUser = {
        id: response.id,
        username: response.username,
        email: response.email,
        roles: response.roles || [],
      };
      localStorage.setItem('authUser', JSON.stringify(authUser));
      setUser(authUser);
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Login failed. Check username and password.';
      setAuthError(typeof message === 'string' ? message : 'Login failed.');
      return false;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const register = useCallback(async ({ username, email, password }) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      await registerUser({ username, email, password, role: ['user'] });
      return await login(username, password);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        'Registration failed.';
      setAuthError(typeof message === 'string' ? message : 'Registration failed.');
      return false;
    } finally {
      setAuthLoading(false);
    }
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setUser(null);
  }, []);

  const openProduct = useCallback((productId) => {
    setSelectedProductId(productId);
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + quantity, product.stock ?? 99) }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          qty: quantity,
          specs: product.category,
          seller: 'Brand Store',
        },
      ];
    });
  }, []);

  const updateCartQty = useCallback((id, qty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const loadProducts = useCallback(
    async ({ search = searchQuery, category = categoryFilter, page = 0, size = 20 } = {}) => {
      return fetchFilteredProducts({ search, category, page, size });
    },
    [searchQuery, categoryFilter]
  );

  const addProductAsAdmin = useCallback(
    async (productPayload) => {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('You must be logged in as admin.');
      return createProduct(productPayload, token);
    },
    []
  );

  const isAdmin = useMemo(
    () => user?.roles?.some((role) => role === 'ROLE_ADMIN'),
    [user]
  );

  const value = useMemo(
    () => ({
      user,
      cart,
      searchQuery,
      categoryFilter,
      selectedProductId,
      selectedProduct,
      authError,
      authLoading,
      isAdmin,
      setSearchQuery,
      setCategoryFilter,
      login,
      register,
      logout,
      openProduct,
      setSelectedProductId,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      loadProducts,
      addProductAsAdmin,
    }),
    [
      user,
      cart,
      searchQuery,
      categoryFilter,
      selectedProductId,
      selectedProduct,
      authError,
      authLoading,
      isAdmin,
      login,
      register,
      logout,
      openProduct,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      loadProducts,
      addProductAsAdmin,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
