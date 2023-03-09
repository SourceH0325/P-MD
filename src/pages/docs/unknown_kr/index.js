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
            placeholder="가이드, 특수 마법, 아이템 등을 검색해보세요"
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
                  className="mr-2 rounded-lg text-lg px-4 py-2 bg-sky-600 hover:bg-sky-700"
                  onClick={() => router.push('/add_list')}
                >
                  <FaPlus />
                </button>
                <button
                  className="rounded-lg text-lg px-4 py-2 bg-gray-600 hover:bg-gray-700"
                  onClick={() => router.push('/edit_docs')}
                >
                  <MdEdit />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                <p className="font-semibold">1.20</p>
              </div>
              <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                <p className="font-semibold">공식</p>
              </div>
            </div>
            <div className="flex justify-end items-center w-auto mt-1">
              <button
                className="rounded-lg text-2xl px-4 py-2 ml-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push('https://discord.com/invite/cq3TeTtNxt')}
              >
                <FaDiscord />
              </button>
            </div>
          </div>
        </div>

        <main className="mb-12">
          <div className="grid gap-4 grid-cols-2 grid-rows-auto mb-12 mobile:grid-cols-3">
            <button className="font-semibold bg-[#141920] rounded-lg p-5 transition-all hover:bg-blue-600">
              가이드
            </button>
            <button className="font-semibold bg-[#141920] rounded-lg p-5 transition-all hover:bg-blue-600">
              특수 마법
            </button>
            <button className="font-semibold bg-[#141920] rounded-lg p-5 transition-all hover:bg-blue-600">
              아이템
            </button>
          </div>
          <div className="grid gap-4 grid-cols-1 grid-rows-auto mobile:grid-cols-3">
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">무기 강화를 하는 법</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">가이드</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">가이드</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">배고프다</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all"
                  onClick={() => router.push('unknown_kr/list/1')}
                >
                  더보기
                </button>
              </div>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">아레스</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">특수 마법</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">특수 마법</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">팁</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
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
      </div>
    </>
  )
}
