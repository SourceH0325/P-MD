import React from "react";

const UrlInput = () => {
  const handleAddUrl = () => {
    const url = document.querySelector('#UrlList');
    const url_div = document.createElement('div');
    const url_link = document.createElement('input');
    const url_name = document.createElement('input');

    if (url.childElementCount >= 5) {
      alert('링크는 최대 5개까지 추가할 수 있습니다!');
      return;
    }

    url_div.setAttribute('id', 'UrlID');
    url_div.setAttribute('class', 'grid gap-0 grid-rows-auto grid-cols-1 mobile:grid-cols-2 mobile:gap-4');

    url_name.setAttribute('type', 'text');
    url_name.setAttribute('id', 'UrlName');
    url_name.setAttribute('maxlength', '5');
    url_name.setAttribute('class', 'mt-4 px-2.5 pb-1 w-full h-12 bg-[#17171b] text-left text-white rounded-lg');
    url_name.setAttribute('placeholder', '예: 마인독스');

    url_link.setAttribute('type', 'text');
    url_link.setAttribute('id', 'UrlLink');
    url_link.setAttribute('class', 'mt-4 px-2.5 pb-1 w-full h-12 bg-[#17171b] text-left text-white rounded-lg');
    url_link.setAttribute('placeholder', '예: https://example.com');

    url_name.addEventListener('input', () => {
      const inputText = url_name.value.trim();
      const validText = inputText.replace(/\s/g, '');

      if (validText.length > 5) {
        url_name.value = validText.slice(0, 5);
      } else {
        url_name.value = validText;
      }
    });

    if (url) {
      url.appendChild(url_div);
      url_div.appendChild(url_name);
      url_div.appendChild(url_link);
    }
  };

  const handleRemoveUrl = () => {
    const url = document.querySelector('#UrlList');
    if (url.childElementCount == 0) {
      return;
    } else {
      url.removeChild(url.lastChild);
    }
  };

  return (
    <div className="bg-[#202026] rounded-lg p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">링크를 설정해 주세요!</h1>
        <h1 className="text-xl text-gray-500 font-bold hidden mobile:block">STEP 4</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">상세 설명에 링크를 설정합니다.</p>
      <div id="UrlList" className="grid gap-0 grid-rows-auto grid-cols-1"></div>
      <div className="mt-4 flex justify-start">
        <button
          className="font-bold text-lg bg-blue-600 hover:bg-blue-700 transition-all px-4 py-2 transition-all mr-2 rounded-lg"
          onClick={handleAddUrl}
        >
          추가하기
        </button>
        <button
          className="font-bold text-lg bg-gray-600 hover:bg-gray-700 rounded-lg px-4 py-2 transition-all mr-2"
          onClick={handleRemoveUrl}
        >
          제거하기
        </button>
      </div>
    </div>
  );
};

export default UrlInput;