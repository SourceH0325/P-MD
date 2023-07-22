import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-20 w-auto mb-2 mx-4 mobile:mx-0">
        <div className="flex justify-center items-center w-full h-12 bg-[#202026] rounded-l-lg">
          <input
            className="px-2.5 pb-1 w-full h-10 bg-[#202026] text-left text-white rounded-lg"
            type="text"
            placeholder="이름, 태그 등을 검색해보세요!"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <input
          type="submit"
          value="검색"
          className="w-20 bg-gray-600 font-bold text-lg cursor-pointer transition-all hover:bg-blue-600 h-12 text-white rounded-r-lg"
          onClick={handleSearch}
        />
      </div>
    </>
  );
}
