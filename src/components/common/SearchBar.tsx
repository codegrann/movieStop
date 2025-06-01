import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(input);
    }, 500);

    return () => clearTimeout(handler);
  }, [input, onSearch]);

  return (
    <input
      type="text"
      className="w-full max-w-md p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Search movies..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchBar;
