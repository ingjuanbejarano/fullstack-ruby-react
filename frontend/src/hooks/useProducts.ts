import { useState, useCallback } from 'react';
import { api } from '../api/client';
import type { Product, ProductFormData, PaginatedResponse } from '../types/product';

interface UseProductsReturn {
  products: Product[];
  meta: PaginatedResponse['meta'] | null;
  loading: boolean;
  error: string | null;
  fetchProducts: (params?: { page?: number; per_page?: number; search?: string; status?: boolean | '' }) => Promise<void>;
  createProduct: (data: ProductFormData) => Promise<{ success: boolean; errors?: string[] }>;
  updateProduct: (id: number, data: ProductFormData) => Promise<{ success: boolean; errors?: string[] }>;
  deleteProduct: (id: number) => Promise<{ success: boolean; errors?: string[] }>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginatedResponse['meta'] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products', params);
      setProducts(response.products);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err?.data?.error || 'Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (data: ProductFormData) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/products', { product: data });
      return { success: true };
    } catch (err: any) {
      const messages = err?.data?.messages || [err?.data?.error || 'Failed to create product'];
      setError(messages.join(', '));
      return { success: false, errors: messages };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id: number, data: ProductFormData) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/products/${id}`, { product: data });
      return { success: true };
    } catch (err: any) {
      const messages = err?.data?.messages || [err?.data?.error || 'Failed to update product'];
      setError(messages.join(', '));
      return { success: false, errors: messages };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/products/${id}`);
      return { success: true };
    } catch (err: any) {
      const messages = err?.data?.messages || [err?.data?.error || 'Failed to delete product'];
      setError(messages.join(', '));
      return { success: false, errors: messages };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    meta,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };
}
