import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { loginUser, registerUser } from '../api/auth';
import { createProduct, fetchFilteredProducts, fetchProductById } from '../api/products';

const AppContext = createContext(null);

const CART_KEY = 'ecommerce_cart';
const USER_KEY = 'authUser';
const TOKEN_KEY = 'authToken';

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadUserFromStorage() {
  try {
    const raw = localStorage.getItem(USER_KEY);
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

  // Persist cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Fetch product details whenever the selected ID changes
  useEffect(() => {
    if (!selectedProductId) {
      setSelectedProduct(null);
      return;
    }
    let cancelled = false;
    fetchProductById(selectedProductId)
        .then((product) => { if (!cancelled) setSelectedProduct(product); })
        .catch(() => { if (!cancelled) setSelectedProduct(null); });
    return () => { cancelled = true; };
  }, [selectedProductId]);

  // ------------------------------------------------------------------
  // Auth helpers
  // ------------------------------------------------------------------

  /** Persist the auth response (token + user info) returned by the backend. */
  function persistAuth(response) {
    localStorage.setItem(TOKEN_KEY, response.token);
    const authUser = {
      id: response.id,
      username: response.username,
      email: response.email,
      roles: response.roles || [],
    };
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setUser(authUser);
  }

  const login = useCallback(async (username, password) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await loginUser({ username, password });
      persistAuth(response);
      return true;
    } catch (error) {
      const message =
          error.response?.data?.message ||
          (typeof error.response?.data === 'string' ? error.response.data : null) ||
          'Login failed. Check your username and password.';
      setAuthError(message);
      return false;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  /**
   * FIX: register() no longer calls login() as a second network request.
   * The refactored backend /register endpoint now returns a JwtResponseDTO
   * directly, so we just persist the token from the registration response.
   */
  const register = useCallback(async ({ username, email, password }) => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await registerUser({ username, email, password, role: ['user'] });
      persistAuth(response);
      return true;
    } catch (error) {
      const message =
          error.response?.data?.message ||
          (typeof error.response?.data === 'string' ? error.response.data : null) ||
          'Registration failed. Please try again.';
      setAuthError(message);
      return false;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setCart([]); // Clear cart on logout for privacy
    setSelectedProductId(null);
    setSelectedProduct(null);
  }, []);

  // ------------------------------------------------------------------
  // Product / cart helpers
  // ------------------------------------------------------------------

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

  const addProductAsAdmin = useCallback(async (productPayload) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) throw new Error('You must be logged in as admin.');
    return createProduct(productPayload, token);
  }, []);

  const isAdmin = useMemo(
      () => user?.roles?.some((role) => role === 'ROLE_ADMIN') ?? false,
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
        user, cart, searchQuery, categoryFilter, selectedProductId, selectedProduct,
        authError, authLoading, isAdmin, login, register, logout, openProduct,
        addToCart, updateCartQty, removeFromCart, clearCart, loadProducts, addProductAsAdmin,
      ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
