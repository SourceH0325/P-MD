import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { FaTimes, FaBars } from 'react-icons/fa'

export default function Layout({ children }) {
  const router = useRouter()

  {
    /* Mobile Menu */
  }
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu)
  }

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenu])

  return (
    <>
      <header className="flex justify-between items-center h-20 w-auto mx-4 mobile:mx-0">
        <div className="flex items-center">
          <div className="flex items-center cursor-pointer select-none" onClick={() => router.push('/')}>
            <Image src="/MINEDOCS_WHITE.png" alt="" width={36} height={40} />
            <h1 className="text-2xl font-bold ml-2 mr-0 mobile:mr-32">MINE DOCS</h1>
          </div>
          <button
            className="font-semibold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1] hidden mobile:block"
            onClick={() => router.push('/')}
          >
            홈
          </button>
          <button className="font-semibold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1] hidden mobile:block">
            지원 서버
          </button>
          <button
            className="font-semibold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1] hidden mobile:block"
            onClick={() => router.push('/add_docs')}
          >
            추가하기
          </button>
        </div>

        <div className="flex items-center">
          <button className="font-semibold text-lg hidden mobile:block">로그인</button>
          <button
            className="font-semibold text-3xl text-gray-500 transition-all hover:text-[#f1f1f1] mobile:hidden"
            onClick={handleMobileMenu}
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#141920] z-50 transition-all mobile:hidden ${
            mobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex justify-between items-center h-20 w-auto mx-4">
            <div className="flex items-center cursor-pointer select-none" onClick={() => router.push('/')}>
              <Image src="/MINEDOCS_WHITE.png" alt="" width={36} height={40} />
              <h1 className="text-2xl font-bold ml-2 mr-0 mobile:mr-32">MINE DOCS</h1>
            </div>

            <div className="flex items-center">
              <button
                className="font-semibold text-3xl text-gray-500 transition-all hover:text-[#f1f1f1]"
                onClick={handleMobileMenu}
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start h-full w-full px-4">
            <button
              className="font-semibold text-2xl mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]"
              onClick={() => router.push('/') && handleMobileMenu()}
            >
              홈
            </button>
            <button className="font-semibold text-2xl mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]">
              지원 서버
            </button>
            <button
              className="font-semibold text-2xl mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]"
              onClick={() => router.push('/add_docs') && handleMobileMenu()}
            >
              추가하기
            </button>
            <button className="font-semibold text-2xl mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]">
              로그인
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="flex justify-center items-center h-20 w-full">
        <p className="font-semibold">© 2023 MINE DOCS</p>
      </footer>
    </>
  )
}
