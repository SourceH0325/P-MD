import React from 'react'

export default function EditListLoad() {
  return (
    <>
      <div className="mx-4 mobile:mx-0 animate-pulse">
        <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-2">
          <div className="bg-[#202026] h-[176px] rounded-lg p-5">
            <div className="h-[32px] bg-gray-700/60 rounded-lg" />
            <div className="h-[28px] bg-gray-700/60 rounded-lg mt-3" />
            <div className="h-[48px] bg-gray-700/60 rounded-lg mt-4" />
          </div>
          <div className="bg-[#202026] h-[176px] rounded-lg p-5">
            <div className="h-[32px] bg-gray-700/60 rounded-lg" />
            <div className="h-[28px] bg-gray-700/60 rounded-lg mt-3" />
            <div className="flex justify-between mt-4">
              <div className="h-[48px] w-[253px] bg-gray-700/60 rounded-lg" />
              <div className="h-[48px] w-[253px] bg-gray-700/60 rounded-lg" />
            </div>
          </div>
          <div className="flex justify-start mt-5">
            <div className="h-[44px] w-[110px] bg-gray-700/60 rounded-lg" />
          </div>
        </div>
      </div>
    </>
  )
}
