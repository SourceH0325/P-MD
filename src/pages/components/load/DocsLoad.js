import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function DocsLoad() {
  return (
    <>
      <div className="mx-4 mobile:mx-0 animate-pulse">
        <div className="bg-[#202026] rounded-lg p-5 w-full mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-[32px] mobile:w-[800px] w-40 bg-gray-700/60 rounded-lg" />
            </div>
            <div className="flex items-center">
              <div className="h-[34px] w-[50px] bg-gray-700/60 rounded-lg mr-2 hidden mobile:block" />
              <div className="h-[34px] w-[50px] bg-gray-700/60 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
            <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
            <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
          </div>
          <div className="flex items-center gap-2 w-full justify-end">
            <div className="h-[38px] w-[88px] bg-gray-700/60 rounded-lg mt-4" />
            <div className="h-[38px] w-[88px] bg-gray-700/60 rounded-lg mt-4" />
          </div>
        </div>
        <div className="mb-12">
          <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-3">
            <div className="bg-[#202026] rounded-lg p-5">
              <div className="h-[32px] bg-gray-700/60 rounded-lg" />
              <div className="flex justify-strt gap-2 mt-2">
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
              </div>
              <div className="flex justify-between mt-2">
                <FaStar className="fill-gray-700/60 text-2xl mt-3.5" />
                <div className="h-[44px] w-[86px] bg-gray-700/60 rounded-lg" />
              </div>
            </div>
            <div className="bg-[#202026] rounded-lg p-5">
              <div className="h-[32px] bg-gray-700/60 rounded-lg" />
              <div className="flex justify-strt gap-2 mt-2">
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
              </div>
              <div className="flex justify-between mt-2">
                <FaStar className="fill-gray-700/60 text-2xl mt-3.5" />
                <div className="h-[44px] w-[86px] bg-gray-700/60 rounded-lg" />
              </div>
            </div>
            <div className="bg-[#202026] rounded-lg p-5">
              <div className="h-[32px] bg-gray-700/60 rounded-lg" />
              <div className="flex justify-strt gap-2 mt-2">
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
                <div className="h-[32px] w-[62px] bg-gray-700/60 rounded-lg" />
              </div>
              <div className="flex justify-between mt-2">
                <FaStar className="fill-gray-700/60 text-2xl mt-3.5" />
                <div className="h-[44px] w-[86px] bg-gray-700/60 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
