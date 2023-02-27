import { FaDiscord } from 'react-icons/fa'

export default function unknown_kr() {
  return (
    <>
      <div className="flex justify-center items-center h-20 w-full mb-2">
        <div className="flex justify-center items-center w-full h-12 bg-[#141920] rounded-lg">
          <input
            className="px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg"
            type="text"
            placeholder="가이드, 특수 마법, 아이템 등을 검색해보세요"
          />
        </div>
      </div>

      <div className="flex justify-center items-center h-auto w-full mb-8">
        <div className="bg-[#141920] rounded-lg p-10 w-full">
          <h1 className="text-2xl font-bold">스텔라 레전드</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="bg-gray-600/60 rounded-lg px-2 py-1">
              <p className="font-semibold">1.20</p>
            </div>
            <div className="bg-gray-600/60 rounded-lg px-2 py-1">
              <p className="font-semibold">공식</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="rounded-lg text-2xl px-4 py-2 ml-4 bg-blue-600 hover:bg-blue-700">
              <FaDiscord />
            </button>
          </div>
        </div>
      </div>

      <main className="mb-12">
        <div className="grid gap-4 grid-cols-5 grid-rows-1 mb-12">
          <button className="bg-[#141920] rounded-lg p-5 transition-all hover:bg-blue-600">가이드</button>
          <button className="bg-[#141920] rounded-lg p-5 transition-all hover:bg-blue-600">특수 마법</button>
          <button className="bg-[#141920] rounded-lg p-5 transition-all hover:bg-blue-600">아이템</button>
          <button className="bg-[#141920] rounded-lg p-5 transition-all hover:bg-blue-600">규칙</button>
          <button className="bg-[#141920] rounded-lg p-5 transition-all hover:bg-blue-600">팁</button>
        </div>
        <div className="grid gap-4 grid-cols-3 grid-rows-100">
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">무기 강화를 하는 법</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">가이드</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">무기 강화</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">라면을 끓이는 법</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">가이드</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">배고프다</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">아레스</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">특수 마법</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">전설 등급</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">데빌</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">특수 마법</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">희귀 등급</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">테스팅</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">팁</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">아이템</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">테스팅</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">팁</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">아이템</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">테스팅</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">팁</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">아이템</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">테스팅</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">팁</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">아이템</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">테스팅</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">팁</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">아이템</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
          <div className="bg-[#141920] rounded-lg p-5">
            <h1 className="text-2xl font-bold">테스팅</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">팁</p>
              </div>
              <div className="bg-gray-600/60 rounded-lg px-2 py-1">
                <p className="font-semibold">아이템</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all">
                더보기
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
