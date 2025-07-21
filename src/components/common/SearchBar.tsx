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
      className="w-full max-w-md p-2 md:p-3 rounded md:rounded-lg bg-secondary text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow shadow-md focus:shadow-lg"
      placeholder="Search movies..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchBar;
