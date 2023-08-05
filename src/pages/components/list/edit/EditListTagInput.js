import React from 'react';

const ListTagInput = ({ tagSetA, tagSetB, handletagSetA, handletagSetB }) => {
  return (
    <div className="bg-[#202026] rounded-lg p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">태그를 설정해 주세요!</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">상세 설명에 태그를 설정합니다.</p>
      <div className="flex justify-between items-center">
        <input
          className="mt-4 mr-2 px-2.5 pb-1 w-full h-12 bg-[#17171b] text-left text-white rounded-lg"
          id="TagA"
          type="text"
          placeholder="예시: 가이드"
          value={tagSetA}
          onChange={handletagSetA}
        />
        <input
          className="mt-4 ml-2 px-2.5 pb-1 w-full h-12 bg-[#17171b] text-left text-white rounded-lg"
          id="TagB"
          type="text"
          placeholder="예시: 전설"
          value={tagSetB}
          onChange={handletagSetB}
        />
      </div>
    </div>
  );
};

export default ListTagInput;
