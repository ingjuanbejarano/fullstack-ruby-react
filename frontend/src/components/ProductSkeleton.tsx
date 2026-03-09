import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-3 w-20 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>
      
      <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-700 rounded"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <div>
          <div className="h-3 w-10 bg-gray-100 dark:bg-gray-700 rounded mb-1"></div>
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div>
          <div className="h-3 w-10 bg-gray-100 dark:bg-gray-700 rounded mb-1"></div>
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};
