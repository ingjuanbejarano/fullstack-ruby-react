import { ProductList } from './components/ProductList';
import { ShoppingBag } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-xl text-gray-900 dark:text-white mt-1 uppercase tracking-wider">
              PITZ<span className="font-light text-indigo-600 dark:text-indigo-400">Inventory</span>
            </span>
          </div>
        </div>
      </nav>

      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
