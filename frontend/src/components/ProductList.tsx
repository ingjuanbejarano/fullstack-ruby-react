import React, { useEffect, useState, useCallback } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Search, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { debounce } from '../utils/debounce';
import { ProductModal } from './ProductModal';
import { ProductCard } from './ProductCard';
import { Pagination } from './Pagination';
import { ProductSkeleton } from './ProductSkeleton';
import type { Product, ProductFormData } from '../types/product';

export const ProductList: React.FC = () => {
  const { products, meta, loading, error, fetchProducts, deleteProduct, createProduct, updateProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<boolean | ''>('');
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Auto-clear notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const debouncedSearch = useCallback(
    debounce((term: string, status: boolean | '', currPage: number) => {
      fetchProducts({ search: term, status, page: currPage });
    }, 500),
    [fetchProducts]
  );

  useEffect(() => {
    debouncedSearch(searchTerm, statusFilter, page);
  }, [searchTerm, statusFilter, page, debouncedSearch]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const res = await deleteProduct(id);
      if (res.success) {
        setNotification({ message: 'Product deleted successfully!', type: 'success' });
        fetchProducts({ search: searchTerm, status: statusFilter, page });
      }
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (data: ProductFormData) => {
    const isEditing = !!editingProduct;
    const res = isEditing
      ? await updateProduct(editingProduct.id, data) 
      : await createProduct(data);

    if (res.success) {
      setNotification({ 
        message: `Product ${isEditing ? 'updated' : 'created'} successfully!`, 
        type: 'success' 
      });
      fetchProducts({ search: searchTerm, status: statusFilter, page });
    }
    return res;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Manage your inventory, prices, and product details.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Product
          </button>
        </div>
      </header>

      {/* Success/Error Notifications */}
      {notification && (
        <div 
          className={`mb-6 p-4 rounded-md flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
            notification.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800' 
              : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
          <span className="text-sm font-medium">{notification.message}</span>
          <button 
            onClick={() => setNotification(null)}
            className="ml-auto text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <span className="sr-only">Close</span>
            <Plus className="h-4 w-4 rotate-45" />
          </button>
        </div>
      )}

      <search className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-2.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:focus:ring-indigo-500 shadow-sm"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="w-full sm:w-48">
          <select
            className="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:focus:ring-indigo-500 shadow-sm"
            value={statusFilter === '' ? '' : statusFilter.toString()}
            onChange={(e) => {
              const val = e.target.value;
              setStatusFilter(val === '' ? '' : val === 'true');
              setPage(1);
            }}
          >
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </search>

      {error && (
        <aside className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/30 border border-red-200 dark:border-red-800" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400 dark:text-red-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No products found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new product or adjust your search filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onEdit={openEditModal} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      {meta && (
        <Pagination 
          currentPage={page} 
          totalPages={meta.total_pages} 
          totalCount={meta.total_count} 
          onPageChange={setPage} 
        />
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </section>
  );
};
