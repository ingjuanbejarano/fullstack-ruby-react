import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <article 
      className="group relative flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all sm:pb-4"
      aria-labelledby={`product-name-${product.id}`}
    >
      <div className="p-6 flex-1">
        <header className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              product.active 
                ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/20' 
                : 'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20'
            }`}>
              {product.active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <span className="text-xs font-mono text-gray-500 line-clamp-1 max-w-[50%]">{product.sku}</span>
        </header>
        
        <h3 
          id={`product-name-${product.id}`}
          className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 h-10">
          {product.description || 'No description available.'}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Price</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">${parseFloat(product.price.toString()).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Stock</p>
            <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
              {product.stock} units
            </p>
          </div>
        </div>
      </div>
      
      <footer className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 transition-opacity">
        <button
          onClick={() => onEdit(product)}
          className="inline-flex items-center p-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10 rounded-md transition-colors border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800"
          aria-label={`Edit ${product.name}`}
        >
          <Edit2 className="h-4 w-4 mr-1" aria-hidden="true" />
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="inline-flex items-center p-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 rounded-md transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-800"
          aria-label={`Delete ${product.name}`}
        >
          <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
          Delete
        </button>
      </footer>
    </article>
  );
};
