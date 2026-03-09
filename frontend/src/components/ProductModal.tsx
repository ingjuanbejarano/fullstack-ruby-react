import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Product, ProductFormData } from '../types/product';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (data: ProductFormData) => Promise<{ success: boolean; errors?: string[] }>;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    sku: '',
    active: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        sku: product.sku,
        active: product.active,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        sku: '',
        active: true,
      });
    }
    setErrors({});
    setServerError(null);
  }, [product, isOpen]);

  const validate = (name: string, value: any): string => {
    switch (name) {
      case 'name':
        if (!value || value.length < 3) return 'Name must be at least 3 characters long';
        if (value.length > 100) return 'Name must be less than 100 characters';
        break;
      case 'sku':
        if (!value) return 'SKU is required';
        if (!/^[A-Z0-9-]+$/.test(value)) return 'SKU can only contain uppercase letters, numbers, and hyphens';
        break;
      case 'price':
        if (value === '' || Number.isNaN(Number(value)) || Number(value) <= 0) return 'Price must be strictly greater than 0';
        break;
      case 'stock':
        if (value === '' || Number.isNaN(Number(value)) || !Number.isInteger(Number(value)) || Number(value) < 0) return 'Stock must be a non-negative integer';
        break;
      case 'description':
        if (value && value.length > 1000) return 'Description cannot exceed 1000 characters';
        break;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }

    setFormData(prev => ({ ...prev, [name]: parsedValue }));

    // Real-time validation
    const errorMsg = validate(name, parsedValue);
    setErrors(prev => ({
      ...prev,
      [name]: errorMsg
    }));
  };

  const isFormValid = () => {
    const nameError = validate('name', formData.name);
    const skuError = validate('sku', formData.sku);
    const priceError = validate('price', formData.price);
    const stockError = validate('stock', formData.stock);
    const descError = validate('description', formData.description);

    setErrors({
      name: nameError,
      sku: skuError,
      price: priceError,
      stock: stockError,
      description: descError,
    });

    return !nameError && !skuError && !priceError && !stockError && !descError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);
    // Explicitly handle empty string to 0 for numericals just in case before saving
    const payload = {
      ...formData,
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0
    };

    const res = await onSave(payload);
    setIsSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setServerError(res.errors?.join(', ') || 'An error occurred while saving the product.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

        <section className="relative inline-block transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle">
          <form onSubmit={handleSubmit}>
            <fieldset className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
              <header className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white" id="modal-title">
                  {product ? 'Edit Product' : 'Create New Product'}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </header>

              {serverError && (
                <aside className="mb-4 rounded-md bg-red-50 dark:bg-red-900/30 p-4 border border-red-200 dark:border-red-800" role="alert">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Failed to save</h3>
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        <p>{serverError}</p>
                      </div>
                    </div>
                  </div>
                </aside>
              )}

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors.name ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600'} sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white`}
                      placeholder="Ergonomic Chair"
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400" data-testid="error-name">{errors.name}</p>}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="sku" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="sku"
                      id="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors.sku ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600'} sm:text-sm sm:leading-6 focus:uppercase dark:bg-gray-700 dark:text-white`}
                      placeholder="PROD-123A"
                    />
                    {errors.sku && <p className="mt-2 text-sm text-red-600 dark:text-red-400" data-testid="error-sku">{errors.sku}</p>}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors.description ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600'} sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white`}
                      placeholder="Brief details about the product..."
                    />
                    {errors.description && <p className="mt-2 text-sm text-red-600 dark:text-red-400" data-testid="error-desc">{errors.description}</p>}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      step="0.01"
                      min="0.01"
                      value={formData.price === 0 && formData.price.toString() === '' ? '' : formData.price}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors.price ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600'} sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.price && <p className="mt-2 text-sm text-red-600 dark:text-red-400" data-testid="error-price">{errors.price}</p>}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    Stock <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      step="1"
                      min="0"
                      value={formData.stock === 0 && formData.stock.toString() === '' ? '' : formData.stock}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${errors.stock ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-indigo-600'} sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.stock && <p className="mt-2 text-sm text-red-600 dark:text-red-400" data-testid="error-stock">{errors.stock}</p>}
                  </div>
                </div>

                <div className="sm:col-span-6 flex items-center">
                  <input
                    id="active"
                    name="active"
                    type="checkbox"
                    checked={formData.active}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label htmlFor="active" className="ml-3 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    Product is active and available for sale
                  </label>
                </div>
              </div>
            </fieldset>
            <footer className="bg-gray-50 dark:bg-gray-800/50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-lg">
              <button
                type="submit"
                disabled={isSubmitting || Object.values(errors).some(err => err !== '')}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="submit-btn"
              >
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto transition-colors"
              >
                Cancel
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};
