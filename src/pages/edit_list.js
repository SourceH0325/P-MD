import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>MINE DOCS</title>
        <meta name="description" content="페이지를 찾을 수 없습니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <div className="flex justify-center items-center my-10">
            <Image src="/404.png" alt="" width={800} height={100} />
          </div>
          <h1 className="text-center font-bold text-2xl">페이지를 찾을 수 없습니다!</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-all font-semibold mx-auto block mt-4"
            onClick={() => router.back()}
          >
            돌아가기
          </button>
        </main>
      </div>
    </>
  )
}
