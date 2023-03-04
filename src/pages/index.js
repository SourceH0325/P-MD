import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>MINE DOCS</title>
        <meta name="description" content="마인크래프트 서버의 플레이를 도와줍니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <div className="flex justify-center items-center h-20 mb-8 w-auto">
          <div className="flex justify-center items-center w-full h-12 bg-[#141920] rounded-lg">
            <input
              className="px-2.5 pb-1 w-full h-10 bg-[#141920] text-left text-white rounded-lg"
              type="text"
              placeholder="서버를 검색해보세요"
            />
          </div>
        </div>

        <main className="mb-12">
          <div className="grid gap-4 grid-rows-auto grid-cols-1 mobile:grid-cols-3">
            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">스텔라 레전드</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">1.20</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">자바</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all"
                  onClick={() => router.push('/docs/unknown_kr')}
                >
                  더보기
                </button>
              </div>
            </div>

            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">시드</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">1.18</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">자바</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all"
                  onClick={() => router.push('/docs/unknown_kr')}
                >
                  더보기
                </button>
              </div>
            </div>

            <div className="bg-[#141920] rounded-lg p-5">
              <h1 className="text-2xl font-bold">배드락</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">1.19</p>
                </div>
                <div className="bg-gray-700/60 rounded-lg px-2 py-1">
                  <p className="font-semibold">배드락</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all"
                  onClick={() => router.push('/docs/unknown_kr')}
                >
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
