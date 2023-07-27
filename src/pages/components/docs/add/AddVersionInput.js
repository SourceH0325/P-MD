import React, { useState } from 'react';
import VersionModal from './AddVersionModal';

const VersionInput = ({ selectedVersion, setSelectedVersion, edition, setEdition }) => {
  const version_options = [
    {
      label: '버전',
      options: [
        { value: 100, label: '1.0' },
        { value: 101, label: '1.1' },
        { value: 125, label: '1.2.5' },
        { value: 131, label: '1.3.1' },
        { value: 132, label: '1.3.2' },
        { value: 142, label: '1.4.2' },
        { value: 144, label: '1.4.4' },
        { value: 145, label: '1.4.5' },
        { value: 146, label: '1.4.6' },
        { value: 147, label: '1.4.7' },
        { value: 151, label: '1.5.1' },
        { value: 152, label: '1.5.2' },
        { value: '160x', label: '1.6.x' },
        { value: 161, label: '1.6.1' },
        { value: 162, label: '1.6.2' },
        { value: 164, label: '1.6.4' },
        { value: '170x', label: '1.7.x' },
        { value: 172, label: '1.7.2' },
        { value: 173, label: '1.7.3' },
        { value: 174, label: '1.7.4' },
        { value: 175, label: '1.7.5' },
        { value: 176, label: '1.7.6' },
        { value: 177, label: '1.7.7' },
        { value: 178, label: '1.7.8' },
        { value: 179, label: '1.7.9' },
        { value: 1710, label: '1.7.10' },
        { value: '180x', label: '1.8.x' },
        { value: 1800, label: '1.8' },
        { value: 1810, label: '1.8.1' },
        { value: 1820, label: '1.8.2' },
        { value: 1830, label: '1.8.3' },
        { value: 1840, label: '1.8.4' },
        { value: 1850, label: '1.8.5' },
        { value: 1860, label: '1.8.6' },
        { value: 1870, label: '1.8.7' },
        { value: 1880, label: '1.8.8' },
        { value: 1890, label: '1.8.9' },
        { value: '190x', label: '1.9.x' },
        { value: 1900, label: '1.9' },
        { value: 1910, label: '1.9.1' },
        { value: 1920, label: '1.9.2' },
        { value: 1930, label: '1.9.3' },
        { value: 1940, label: '1.9.4' },
        { value: '110x', label: '1.10.x' },
        { value: 11000, label: '1.10' },
        { value: 11010, label: '1.10.1' },
        { value: 11020, label: '1.10.2' },
        { value: '111x', label: '1.11.x' },
        { value: 11100, label: '1.11' },
        { value: 11110, label: '1.11.1' },
        { value: 11120, label: '1.11.2' },
        { value: '112x', label: '1.12.x' },
        { value: 11200, label: '1.12' },
        { value: 11210, label: '1.12.1' },
        { value: 11220, label: '1.12.2' },
        { value: '113x', label: '1.13.x' },
        { value: 11300, label: '1.13' },
        { value: 11310, label: '1.13.1' },
        { value: 11320, label: '1.13.2' },
        { value: '114x', label: '1.14.x' },
        { value: 11400, label: '1.14' },
        { value: 11410, label: '1.14.1' },
        { value: 11420, label: '1.14.2' },
        { value: 11430, label: '1.14.3' },
        { value: 11440, label: '1.14.4' },
        { value: '115x', label: '1.15.x' },
        { value: 11500, label: '1.15' },
        { value: 11510, label: '1.15.1' },
        { value: 11520, label: '1.15.2' },
        { value: '116x', label: '1.16.x' },
        { value: 11610, label: '1.16.1' },
        { value: 11620, label: '1.16.2' },
        { value: 11630, label: '1.16.3' },
        { value: 11640, label: '1.16.4' },
        { value: 11650, label: '1.16.5' },
        { value: '1170x', label: '1.17.x' },
        { value: 11700, label: '1.17' },
        { value: 11710, label: '1.17.1' },
        { value: '118x', label: '1.18.x' },
        { value: 11800, label: '1.18' },
        { value: 11810, label: '1.18.1' },
        { value: 11820, label: '1.18.2' },
        { value: '1190x', label: '1.19.x' },
        { value: 11900, label: '1.19' },
        { value: 11910, label: '1.19.1' },
        { value: 11920, label: '1.19.2' },
        { value: 11930, label: '1.19.3' },
        { value: 11940, label: '1.19.4' },
        { value: '120x', label: '1.20.x' },
        { value: 12000, label: '1.20' },
        { value: 12010, label: '1.20.1' },
      ],
    },
  ];

  const [isVersionModalOpen, setVersionModalOpen] = useState(false);

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
        <h1 className="text-2xl font-bold">버전을 설정해 주세요!</h1>
        <h1 className="text-xl text-gray-500 font-bold hidden mobile:block">STEP 2</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">버전과 에디션을 설정해주세요!</p>
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
              : `${selectedVersion.minVersion.label} ~ ${selectedVersion.maxVersion.label}`
            : '버전 설정'}
        </button>
        <VersionModal
          isOpen={isVersionModalOpen}
          closeModal={closeVersionModal}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
          versionOptions={version_options[0].options}
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
