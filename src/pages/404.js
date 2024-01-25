import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Error404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="페이지를 찾을 수 없습니다." />
      </Head>

      <div className="mx-4 mobile:mx-0">
        <main className="mb-12">
          <div className="flex justify-center items-center my-10">
            <h1 className="text-5xl font-bold p-5 bg-blue-600 rounded-lg float">404 ERROR</h1>
          </div>
          <p className="text-center font-medium text-xl p-1">존재하지 않는 주소를 입력하셨거나,</p>
          <p className="text-center font-medium text-xl p-1">
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </p>
          <button
            className="font-bold text-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 transition-all mx-auto mt-10 rounded-lg block"
            onClick={() => router.push('/')}
          >
            메인으로
          </button>
        </main>
      </div>
    </>
  );
}
