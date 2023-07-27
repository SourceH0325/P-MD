import React, { useState } from 'react';
import Select from 'react-tailwindcss-select';

const TagInput = ({ tag, setTag, onTagChange }) => {
  const tag_options = [
    {
      label: '장르',
      options: [
        { value: '건축', label: '건축' },
        { value: '경제', label: '경제' },
        { value: '마인팜', label: '마인팜' },
        { value: 'mcMMO', label: 'mcMMO' },
        { value: '모드', label: '모드' },
        { value: '모드팩', label: '모드팩' },
        { value: '미니게임', label: '미니게임' },
        { value: '바닐라', label: '바닐라' },
        { value: '반야생', label: '반야생' },
        { value: 'PVP', label: 'PVP' },
        { value: '스카이블럭', label: '스카이블럭' },
        { value: '약탈', label: '약탈' },
        { value: '야생', label: '야생' },
        { value: '타우니', label: '타우니' },
        { value: '포켓몬', label: '포켓몬' },
        { value: 'RPG', label: 'RPG' },
      ],
    },
  ];

  const handleChange_tag = value => {
    setTag(value);
    onTagChange(value); // Notify the parent component about the tag selection
  };

  return (
    <div className="bg-[#202026] rounded-lg p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">태그를 설정해 주세요!</h1>
        <h1 className="text-xl text-gray-500 font-bold hidden mobile:block">STEP 3</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">이름 밑에 뜰 태그를 설정합니다.</p>
      <div className="mt-4">
        <Select
          placeholder="태그를 설정해 주세요!"
          searchInputPlaceholder="검색"
          value={tag}
          onChange={handleChange_tag}
          options={tag_options}
          isMultiple={true}
          isClearable={true}
          isSearchable={true}
          noOptionsMessage="일치하는 태그가 없습니다!"
          classNames={{
            searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#202026] text-left text-white rounded-lg',
            searchIcon: 'hidden',
            menu: 'bg-[#17171b] rounded-lg mt-3',
            tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
            menuButton: () =>
              'bg-[#17171b] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
            tagItem: () => 'bg-gray-600 rounded-lg flex pl-1',
            tagItemIconContainer:
              'flex items-center px-1 cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
          }}
          formatGroupLabel={data => <span className="text-gray-500 font-bold text-lg hidden">{data.label}</span>}
          formatOptionLabel={data => (
            <button className="text-left w-full rounded-md px-2.5 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
              {data.label}
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default TagInput;
