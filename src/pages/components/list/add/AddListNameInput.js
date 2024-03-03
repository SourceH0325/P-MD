import React from 'react'

const ListNameInput = () => {
  return (
    <div className="bg-[#202026] rounded-lg p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">리스트 이름을 설정해 주세요!</h1>
      </div>
      <p className="mt-3 text-lg text-gray-500 font-bold">
        메인에 뜰 이름을 설정합니다.
      </p>
      <input
        className="mt-4 px-2.5 pb-1 w-full h-12 bg-[#17171b] text-left text-white rounded-lg"
        id="Name"
        type="text"
        placeholder="예시: 마인 독스"
      />
    </div>
  )
}

export default ListNameInput
