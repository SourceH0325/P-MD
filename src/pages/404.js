import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Error404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>MINE DOCS</title>
        <meta name="description" content="페이지를 찾을 수 없습니다." />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <div className="flex justify-center items-center my-10">
            <Image src="/404.png" alt="" width={800} height={100} />
          </div>
          <h1 className="text-center font-bold text-2xl">페이지를 찾을 수 없습니다!</h1>
          <button
            className="border-2 border-gray-600 text-lg hover:border-blue-600 rounded-lg px-4 py-2 transition-all font-bold mx-auto block mt-4"
            onClick={() => router.back()}
          >
            돌아가기
          </button>
        </main>
      </div>
    </>
  );
}
