import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const Router = useRouter()

  return (
    <>
      <header className="flex justify-between items-center h-20 w-full">
        <div className="flex items-center">
          <Image src="/MINEDOCS_WHITE.png" alt="MINE DOCS" width={36} height={40} />
          <h1 className="text-2xl font-bold ml-2 mr-32">MINE DOCS</h1>
          <button
            className="font-semibold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1]"
            onClick={() => Router.push('/')}
          >
            홈
          </button>
          <button className="font-semibold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1]">
            공지사항
          </button>
          <button className="font-semibold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1]">
            추가하기
          </button>
        </div>
        <div className="flex items-center">
          <button className="font-semibold text-lg">로그인</button>
        </div>
      </header>
      {children}
      <footer className="flex justify-center items-center h-20 w-full">
        <p className="font-semibold">© 2023 MINE DOCS</p>
      </footer>
    </>
  )
}
