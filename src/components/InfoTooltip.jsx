import { useState } from 'react';

export default function InfoTooltip({ content }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block ml-1">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="text-gray-400 hover:text-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
      {isVisible && (
        <div className="absolute z-10 w-64 px-4 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg -right-2 bottom-full mb-2">
          {content}
          <div className="absolute bottom-[-6px] right-3 w-3 h-3 bg-white border-r border-b transform rotate-45"></div>
        </div>
      )}
    </div>
  );
}
