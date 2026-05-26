import { apiClient } from './client';

export async function fetchProducts(page = 0, size = 20) {
  const { data } = await apiClient.get('/api/v1/products', {
    params: { page, size },
  });
  return data;
}

export async function fetchProductById(id) {
  const { data } = await apiClient.get(`/api/v1/products/${id}`);
  return data;
}

export async function fetchFilteredProducts({ search, category, page = 0, size = 20 }) {
  const params = { page, size };
  if (search?.trim()) params.search = search.trim();
  if (category?.trim()) params.category = category.trim();

  const { data } = await apiClient.get('/api/v1/products/filter', { params });
  return data;
}

export async function createProduct(product, token) {
  const { data } = await apiClient.post('/api/v1/products', product, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return data;
}
