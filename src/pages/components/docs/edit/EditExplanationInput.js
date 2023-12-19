import React, { useState, useEffect, useRef } from 'react';

const ExplanationInput = ({ defaultValue }) => {
  const [text, setText] = useState(defaultValue);
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="bg-[#202026] rounded-lg p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">설명을 적어주세요!</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">서버에 대한 설명을 설정합니다.</p>
      <textarea
        ref={textAreaRef}
        className="mt-4 p-2.5 w-full bg-[#17171b] text-left text-white rounded-lg resize-none outline-none"
        id="Explanation"
        type="text"
        placeholder="예: 마인독스는 사이트입니다."
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default ExplanationInput;