import React from 'react';
import { useState } from 'react';
import Select from 'react-tailwindcss-select';

const BasicVersion = ({ version, onChange, options }) => {
  return (
    <Select
      placeholder="버전을 설정해 주세요!"
      searchInputPlaceholder="검색"
      value={version}
      onChange={onChange}
      options={options}
      isClearable={true}
      isSearchable={true}
      noOptionsMessage="일치하는 버전이 없습니다!"
      classNames={{
        searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#202026] text-left text-white rounded-lg',
        searchIcon: 'hidden',
        menu: 'bg-[#17171b] rounded-lg mt-3',
        tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
        menuButton: () =>
          'bg-[#17171b] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
        tagItem: () => 'bg-gray-600 rounded-lg flex pl-1',
        tagItemIconContainer:
          'flex items-center cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
      }}
      formatGroupLabel={data => <span className="text-gray-500 font-bold text-lg hidden">{data.label}</span>}
      formatOptionLabel={data => (
        <button className="text-left w-full rounded-md px-2.5 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
          {data.label}
        </button>
      )}
    />
  );
};

const MultipleVersion = ({ versions, onChange, options }) => {
  return (
    <Select
      placeholder="여러 버전을 설정해 주세요!"
      searchInputPlaceholder="검색"
      value={versions}
      onChange={onChange}
      options={options}
      isMultiple={true}
      isClearable={true}
      isSearchable={true}
      noOptionsMessage="일치하는 버전이 없습니다!"
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
  );
};

const RangeVersion = ({ minVersion, maxVersion, onChange, options }) => {
  return (
    <>
      <div className="py-2">
        <Select
          placeholder="최소 버전을 설정해 주세요!"
          searchInputPlaceholder="검색"
          value={minVersion}
          onChange={value => onChange({ minVersion: value, maxVersion })}
          options={options}
          isClearable={true}
          isSearchable={true}
          noOptionsMessage="일치하는 버전이 없습니다!"
          classNames={{
            searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#202026] text-left text-white rounded-lg',
            searchIcon: 'hidden',
            menu: 'bg-[#17171b] rounded-lg mt-3',
            tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
            menuButton: () =>
              'bg-[#17171b] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
            tagItem: () => 'bg-gray-600 rounded-lg flex pl-1',
            tagItemIconContainer:
              'flex items-center cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
          }}
          formatGroupLabel={data => <span className="text-gray-500 font-bold text-lg hidden">{data.label}</span>}
          formatOptionLabel={data => (
            <button className="text-left w-full rounded-md px-2.5 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
              {data.label}
            </button>
          )}
        />
      </div>
      <div className="py-2">
        <Select
          placeholder="최대 버전을 설정해 주세요!"
          searchInputPlaceholder="검색"
          value={maxVersion}
          onChange={value => onChange({ minVersion, maxVersion: value })}
          options={options}
          isClearable={true}
          isSearchable={true}
          noOptionsMessage="일치하는 버전이 없습니다!"
          classNames={{
            searchBox: 'mt-4 px-2.5 pb-1 w-full h-10 bg-[#202026] text-left text-white rounded-lg',
            searchIcon: 'hidden',
            menu: 'bg-[#17171b] rounded-lg mt-3',
            tagItemText: 'inline-block bg-[#4B5563] rounded-lg px-2 py-1 my-1 mr-1',
            menuButton: () =>
              'bg-[#17171b] flex text-gray-500 rounded-lg transition-all h-auto w-full justify-between items-center',
            tagItem: () => 'bg-gray-600 rounded-lg flex pl-1',
            tagItemIconContainer:
              'flex items-center cursor-pointer rounded-r-lg hover:bg-gray-700 hover:text-[#f1f1f1] transition-all',
          }}
          formatGroupLabel={data => <span className="text-gray-500 font-bold text-lg hidden">{data.label}</span>}
          formatOptionLabel={data => (
            <button className="text-left w-full rounded-md px-2.5 py-1 my-1 cursor-pointer hover:bg-gray-700 transition-all">
              {data.label}
            </button>
          )}
        />
      </div>
    </>
  );
};

const VersionModal = ({ isOpen, closeModal, setSelectedVersion, versionOptions }) => {
  const [selectedVersion, setSelectedVersionInternal] = useState({
    type: 'single',
  });

  const handleTypeChange = type => {
    setSelectedVersionInternal({
      type,
    });
  };

  const handleSingleVersionChange = value => {
    setSelectedVersionInternal({
      ...selectedVersion,
      singleVersion: value,
    });
  };

  const handleMultipleVersionChange = value => {
    setSelectedVersionInternal({
      ...selectedVersion,
      multipleVersions: value,
    });
  };

  const handleRangeVersionChange = ({ minVersion, maxVersion }) => {
    setSelectedVersionInternal({
      ...selectedVersion,
      singleVersion: '',
      multipleVersions: [],
      minVersion,
      maxVersion,
    });
  };

  const handleApplyVersion = () => {
    if (selectedVersion.type === 'single') {
      if (!selectedVersion.singleVersion) {
        alert('버전을 선택해주세요!');
        return;
      }
    } else if (selectedVersion.type === 'multiple') {
      if (!selectedVersion.multipleVersions || selectedVersion.multipleVersions.length <= 1) {
        alert('버전을 2개 이상 선택해주세요!');
        return;
      }
    
      const versionsWithX = selectedVersion.multipleVersions.filter(version => version.label.includes('x'));
      for (const versionWithX of versionsWithX) {
        const [majorWithX, minorWithX] = versionWithX.label.split('.');
        for (const version of selectedVersion.multipleVersions) {
          const [major, minor] = version.label.split('.');
          if (majorWithX === major && minorWithX === minor && version.label !== versionWithX.label) {
            alert('동일한 메이저와 마이너 버전을 가진 버전은 추가할 수 없습니다!');
            return;
          }
        }
      }
    } else if (selectedVersion.type === 'range') {
      if (!selectedVersion.minVersion || !selectedVersion.maxVersion) {
        alert('최소, 최대 버전을 선택해주세요!');
        return;
      } else if (selectedVersion.minVersion.value > selectedVersion.maxVersion.value) {
        alert('최소 버전이 최대 버전보다 높습니다!');
        return;
      } else if (selectedVersion.minVersion.value === selectedVersion.maxVersion.value) {
        alert('최소 버전과 최대 버전이 같습니다!');
        return;
      }

      const minVersionParts = selectedVersion.minVersion.label.split('.');
      const maxVersionParts = selectedVersion.maxVersion.label.split('.');
      if (minVersionParts[0] === maxVersionParts[0] && minVersionParts[1] === maxVersionParts[1]) {
        if (minVersionParts[2] === 'x' || maxVersionParts[2] === 'x') {
          alert('동일한 메이저와 마이너 버전을 가진 범위는 선택할 수 없습니다!');
          return;
        }
      }
    }

    setSelectedVersion(selectedVersion);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-60" onClick={closeModal} role="presentation"></div>
      <div className="bg-[#202026] p-8 rounded-lg shadow-lg z-50">
        <div className="text-lg font-bold mb-2">버전 선택</div>
        <div className="mb-4">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 font-bold text-lg rounded-lg transition-all hover:bg-blue-600 ${
                selectedVersion.type === 'single' ? 'bg-blue-600 border-none' : 'bg-[#17171b] border-none'
              }`}
              onClick={() => handleTypeChange('single')}
            >
              단일 버전
            </button>
            <button
              className={`px-4 py-2 font-bold text-lg rounded-lg transition-all hover:bg-blue-600 ${
                selectedVersion.type === 'multiple' ? 'bg-blue-600 border-none' : 'bg-[#17171b] border-none'
              }`}
              onClick={() => handleTypeChange('multiple')}
            >
              다중 버전
            </button>
            <button
              className={`px-4 py-2 font-bold text-lg rounded-lg transition-all hover:bg-blue-600 ${
                selectedVersion.type === 'range' ? 'bg-blue-600 border-none' : 'bg-[#17171b] border-none'
              }`}
              onClick={() => handleTypeChange('range')}
            >
              범위 버전
            </button>
          </div>
        </div>
        {selectedVersion.type === 'single' && (
          <div className="mb-4">
            <BasicVersion
              version={selectedVersion.singleVersion}
              onChange={handleSingleVersionChange}
              options={versionOptions}
            />
          </div>
        )}
        {selectedVersion.type === 'multiple' && (
          <div className="mb-4">
            <MultipleVersion
              versions={selectedVersion.multipleVersions}
              onChange={handleMultipleVersionChange}
              options={versionOptions}
            />
          </div>
        )}
        {selectedVersion.type === 'range' && (
          <div className="mb-4">
            <RangeVersion
              minVersion={selectedVersion.minVersion}
              maxVersion={selectedVersion.maxVersion}
              onChange={handleRangeVersionChange}
              options={versionOptions}
            />
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="font-bold text-lg bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="font-bold text-lg bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all"
            onClick={handleApplyVersion}
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersionModal;
