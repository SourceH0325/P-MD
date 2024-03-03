import React from 'react'

export default function ListLoad() {
  return (
    <>
      <div className="mx-4 mobile:mx-0 animate-pulse">
        <div className="mb-12">
          <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-2">
            <div className="bg-[#202026] h-[150px] rounded-lg p-5">
              <div className="h-[32px] bg-gray-700/60 rounded-lg" />
              <div className="h-[32px] bg-gray-700/60 rounded-lg mt-3" />
            </div>
            <div className="bg-[#202026] h-[150px] rounded-lg p-5">
              <div className="h-[32px] bg-gray-700/60 rounded-lg" />
              <div className="h-[32px] bg-gray-700/60 rounded-lg mt-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
