import React, { useState } from 'react';
import VersionModal from './EditVersionModal';
import versions from '@/data/versions.json';

const VersionInput = ({ selectedVersion, setSelectedVersion, edition, setEdition }) => {
  const [isVersionModalOpen, setVersionModalOpen] = useState(false);

  const version_options = versions.options.map(version => {
    return {
      label: version.label,
      value: version.value,
    };
  });

  const openVersionModal = () => {
    setVersionModalOpen(true);
  };

  const closeVersionModal = () => {
    setVersionModalOpen(false);
  };

  const handleEditionChange = event => {
    setEdition(event.target.value); // Update the "edition" state when the user selects an edition
  };

  const getMultipleVersionsLabel = () => {
    if (selectedVersion?.type === 'multiple') {
      const selectedVersions = selectedVersion.multipleVersions.map(version => version.label);
      const additionalCount = selectedVersion.multipleVersions.length - 1;
      return `${selectedVersions[0]} 외 ${additionalCount}개`;
    }
    return '';
  };

  return (
    <div className="bg-[#202026] rounded-lg p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">버전과 에디션을 설정해 주세요!</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">버전과 에디션을 설정합니다.</p>
      <div className="mt-4 grid grid-rows-auto grid-cols-1 mobile:grid-cols-2 gap-4">
        <button
          className="text-lg font-bold bg-[#17171b] hover:bg-blue-600 transition-all px-4 py-2 rounded-lg"
          onClick={openVersionModal}
        >
          {selectedVersion
            ? selectedVersion.type === 'single'
              ? selectedVersion.singleVersion.label
              : selectedVersion.type === 'multiple'
                ? getMultipleVersionsLabel()
                : selectedVersion.type === 'range'
                  ? `${selectedVersion.minVersion.label} ~ ${selectedVersion.maxVersion.label}`
                  : selectedVersion.label
            : '버전을 설정해 주세요!'}
        </button>
        <VersionModal
          isOpen={isVersionModalOpen}
          closeModal={closeVersionModal}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
          versionOptions={version_options}
          handleEditionChange={handleEditionChange} // Pass the handleEditionChange prop
        />

        <div className="grid gap-4 grid-cols-2 grid-rows-auto">
          <div className="text-center">
            <input
              type="radio"
              id="java"
              name="option"
              value="자바"
              checked={edition === '자바'}
              onChange={handleEditionChange} // Use the handleEditionChange prop
              className="hidden"
            />
            <label
              htmlFor="java"
              className={`block bg-[#17171b] text-lg cursor-pointer font-bold hover:bg-blue-600 transition-all px-4 py-2 transition-all rounded-lg ${
                edition === '자바' && 'bg-blue-600'
              }`}
            >
              자바
            </label>
          </div>
          <div className="text-center">
            <input
              type="radio"
              id="bedrock"
              name="option"
              value="베드락"
              checked={edition === '베드락'}
              onChange={handleEditionChange} // Use the handleEditionChange prop
              className="hidden"
            />
            <label
              htmlFor="bedrock"
              className={`block bg-[#17171b] text-lg cursor-pointer font-bold hover:bg-blue-600 transition-all px-4 py-2 transition-all rounded-lg ${
                edition === '베드락' && 'bg-blue-600'
              }`}
            >
              베드락
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionInput;
