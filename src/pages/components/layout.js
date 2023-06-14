import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';

export default function Layout({ children }) {
  const router = useRouter();

  const { data: session } = useSession();
  // 모바일 메뉴
  const [mobileMenu, setMobileMenu] = useState(false);

  // 관리자 여부
  const [admin, isAdmin] = useState(false);

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenu]);

  useEffect(() => {
    // callroleDB에 접근해서 role을 가져온다.
    axios
      .post('/api/callroleDB', {
        name: session?.user.name,
        email: session?.user.email,
      })
      .then(res => {
        const result = res.data.result; // 응답에서 result 배열 추출

        if (result && result.length > 0 && result[0].role === 'admin') {
          isAdmin(true);
        } else {
          isAdmin(false);
        }
      })
      .catch(error => {
        // 오류 처리
        console.error(error);
      });
  }, [session]);

  return (
    <>
      <header className="flex justify-between items-center h-20 w-auto mx-4 mobile:mx-0">
        <div className="flex items-center">
          <div className="flex items-center cursor-pointer select-none" onClick={() => router.push('/')}>
            <Image src="/MINEDOCS_WHITE.png" alt="" width={36} height={40} />
            <h1 className="text-2xl font-bold ml-2 mr-0 mobile:mr-32">MINE DOCS</h1>
          </div>
          <button
            className="font-bold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1] hidden mobile:block"
            onClick={() => router.push('/')}
          >
            메인
          </button>
          <button
            className="font-bold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1] hidden mobile:block"
            onClick={() => router.push('/add_docs')}
          >
            추가하기
          </button>
          <button
            className="font-bold text-lg mr-14 text-gray-500 transition-all hover:text-[#f1f1f1] hidden mobile:block"
            onClick={() => router.push('https://discord.gg/4wTeugQez3')}
          >
            디스코드
          </button>
        </div>

        <div className="flex items-center">
          {!session && (
            <button className="font-bold text-lg hidden mobile:block" onClick={() => signIn('discord')}>
              로그인
            </button>
          )}
          {session && (
            <div className="relative inline-block hidden mobile:block">
              <button type="button" className="inline-flex items-center px-0 py-2 text-gray-700">
                <Image src={session.user.image} alt="Profile" width={40} height={40} className="rounded-full" />
              </button>
              <div className="absolute right-0 mt-1 w-56 rounded-lg shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible transition-all duration-300 z-50">
                <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button
                    className="block w-full text-left px-4 py-2 text-lg font-bold text-white hover:bg-gray-700 rounded-t-lg transition-all"
                    role="menuitem"
                    onClick={() => router.push('/bookmark')}
                  >
                    즐겨찾기
                  </button>
                  {admin && (
                    <button
                      className="block w-full text-left px-4 py-2 text-lg font-bold text-white hover:bg-gray-700 transition-all"
                      role="menuitem"
                      onClick={() => router.push('/request')}
                    >
                      요청
                    </button>
                  )}
                  <button
                    className="block w-full text-left px-4 py-2 text-lg font-bold text-white hover:bg-gray-700 rounded-b-lg transition-all hover:text-rose-500"
                    role="menuitem"
                    onClick={() => signOut('discord')}
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            </div>
          )}
          {!session && (
            <button
              className="font-bold text-3xl text-gray-500 transition-all hover:text-[#f1f1f1] mobile:hidden"
              onClick={handleMobileMenu}
            >
              <FaBars />
            </button>
          )}
          {session && (
            <>
              <div className="relative inline-block mobile:hidden z-50 mr-3">
                <button type="button" className="inline-flex items-center px-0 py-2 text-gray-700">
                  <Image src={session.user.image} alt="Profile" width={40} height={40} className="rounded-full" />
                </button>
              </div>
              <button
                className="font-bold text-3xl text-gray-500 transition-all hover:text-[#f1f1f1] mobile:hidden"
                onClick={handleMobileMenu}
              >
                <FaBars />
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#141920] z-40 transition-all mobile:hidden ${
            mobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex justify-between items-center h-20 w-auto mx-4">
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={() => router.push('/') && handleMobileMenu()}
            >
              <Image src="/MINEDOCS_WHITE.png" alt="" width={36} height={40} />
              <h1 className="text-2xl font-bold ml-2 mr-0 mobile:mr-32">MINE DOCS</h1>
            </div>

            <div className="flex items-center">
              <button
                className="font-bold text-3xl text-gray-500 transition-all hover:text-[#f1f1f1]"
                onClick={handleMobileMenu}
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start h-full w-full px-4">
            <button
              className="font-bold text-2xl mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]"
              onClick={() => router.push('/') && handleMobileMenu()}
            >
              메인
            </button>
            <button
              className="font-bold text-2xl mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]"
              onClick={() => router.push('/add_docs') && handleMobileMenu()}
            >
              추가하기
            </button>
            <button
              className="font-bold text-2xl mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]"
              onClick={() => router.push('https://discord.gg/4wTeugQez3') && handleMobileMenu()}
            >
              디스코드
            </button>
            {!session && (
              <button
                className="font-bold text-2xl mt-6 mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]"
                onClick={() => signIn('discord')}
              >
                로그인
              </button>
            )}
            {session && (
              <>
                <button
                  className="font-bold text-2xl mt-6 mb-4 text-gray-500 transition-all hover:text-[#f1f1f1]"
                  onClick={() => router.push('/bookmark') && handleMobileMenu()}
                >
                  즐겨찾기
                </button>
                {admin && (
                  <button
                    className="font-bold text-2xl mb-4 text-gray-500 transition-all hover:text-blue-600"
                    onClick={() => router.push('/request') && handleMobileMenu()}
                  >
                    요청
                  </button>
                )}
                <button
                  className="font-bold text-2xl mb-4 text-gray-500 transition-all hover:text-[#f1f1f1] hover:text-rose-500"
                  onClick={() => signOut('discord')}
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
          0
        </div>
      </header>
      {children}
      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto flex flex-wrap justify-center">
          <div className="w-full lg:w-1/3 px-4">
            <p className="text-gray-600 text-lg font-bold text-center">&#169; 2023 MINE DOCS</p>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <p className="text-gray-600 font-bold text-center">support@minedocs.xyz</p>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="flex justify-center space-x-4">
              <a
                onClick={() => router.push('/privacy')}
                className="text-gray-600 hover:text-gray-800 font-bold cursor-pointer"
              >
                개인정보처리방침
              </a>
              <a
                onClick={() => router.push('/tos')}
                className="text-gray-600 hover:text-gray-800 font-bold cursor-pointer"
              >
                이용약관
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
