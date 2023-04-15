import Head from 'next/head'
import { FaDiscord } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/router'

export default function unknown_kr() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()

  return (
    <>
      <Head>
        <title>스텔라 레전드</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center items-center h-20 w-auto mb-2 mx-4 mobile:mx-0">
        <div className="flex justify-center items-center w-full h-12 bg-[#141920] rounded-lg">
          <input
            className="px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg"
            type="text"
            placeholder="가이드, 특수 마법, 태그 등을 검색해보세요"
          />
        </div>
      </div>
      <div className="mx-4 mobile:mx-0">
        <div className="flex justify-center items-center h-auto w-full mb-8">
          <div className="bg-[#141920] rounded-lg p-5 w-full">
            <div className="flex justify-between items-center w-auto">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold">스텔라 레전드</h1>
              </div>
              <div className="flex items-center">
                <button
                  className="mr-2 rounded-lg text-lg px-4 py-2 font-bold border-2 border-gray-600 hover:border-blue-600 transition-all"
                  onClick={() => router.push('/add_list')}
                >
                  <FaPlus />
                </button>
                <button
                  className="rounded-lg text-lg px-4 py-2 font-bold border-2 border-gray-600 hover:border-lime-600 transition-all"
                  onClick={() => router.push('/edit_docs')}
                >
                  <MdEdit />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                <p className="font-bold">1.20</p>
              </div>
              <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                <p className="font-bold">공식</p>
              </div>
            </div>
            <div
              className="flex items-center w-auto mt-4 whitespace-nowrap overflow-auto mobile:justify-end"
              id="LinkList_Main"
            >
              <button
                className="rounded-lg text-2xl px-4 py-2 mobile:ml-4 mobile:mr-0 mr-4 ml-0 font-bold border-2 border-gray-600 hover:border-blue-600 hover:bg-blue-600 transition-all"
                onClick={() => router.push('https://discord.gg/cq3TeTtNxt')}
              >
                <FaDiscord />
              </button>
            </div>
          </div>
        </div>

        <main className="mb-12">
          <div className="grid gap-4 grid-cols-1 grid-rows-auto mobile:grid-cols-3">
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">무기 강화를 하는 법</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">가이드</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">무기 강화</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">라면을 끓이는 법</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">가이드</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">배고프다</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">아레스</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">특수 마법</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">전설 등급</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">데빌</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">특수 마법</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">희귀 등급</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">테스팅</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">아이템</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">테스팅</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">아이템</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">테스팅</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">아이템</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">테스팅</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">아이템</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">테스팅</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">아이템</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">테스팅</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-bold">아이템</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="font-bold border-2 border-gray-600 hover:border-blue-600 rounded-lg px-4 py-2 transition-all">
                  더보기
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
