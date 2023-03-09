import Head from 'next/head'
import { useRouter } from 'next/router'
import { MdEdit } from 'react-icons/md'

export default function unknown_kr() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()

  return (
    <>
      <Head>
        <title>라면을 끓이는 법</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <div className="flex justify-center items-center h-auto w-full mb-8">
          <div className="bg-[#141920] rounded-lg p-5 w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">라면을 끓이는 법</h1>
              <button
                className="rounded-lg text-lg px-4 py-2 bg-gray-600 hover:bg-gray-700"
                onClick={() => router.push('/edit_list')}
              >
                <MdEdit />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                <p className="font-semibold">가이드</p>
              </div>
              <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                <p className="font-semibold">배고프다</p>
              </div>
            </div>
          </div>
        </div>

        <main className="mb-12">
          <div className="grid gap-4 grid-cols-1 grid-rows-auto mobile:grid-cols-3">
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold text-center">1단계</h1>
              <p className="text-xl mt-4 font-semibold">물 550ml(3컵 정도)를 냄비에 붓고 물을 끓인다.</p>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold text-center">2단계</h1>
              <p className="text-xl mt-4 font-semibold">준비된 면 + 분말스프 + 후레이크를 넣고 4분 30초간 끓여준다.</p>
            </div>
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold text-center">3단계</h1>
              <p className="text-xl mt-4 font-semibold">먹어준다.</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-8 font-semibold">
            <p className="text-sm text-gray-500">최근 수정일: 2023년 03월 06일</p>
            <p className="text-sm text-gray-500">작성자: SourceH#0325</p>
          </div>
        </main>
      </div>
    </>
  )
}
