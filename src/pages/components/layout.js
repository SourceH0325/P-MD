import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';
import axios from 'axios';

export default function Layout({ children }) {
  const router = useRouter();

  const { data: session } = useSession();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [admin, isAdmin] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

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
    axios
      .post('/api/calluserDB', {
        name: session?.user.name,
        email: session?.user.email,
      })
      .then(res => {
        const result = res.data.result;

        if (result && result.length > 0 && result[0].role === 'admin') {
          isAdmin(true);
        } else {
          isAdmin(false);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [session]);

  useEffect(() => {
    axios
      .post('/api/calluserDB', {
        name: session?.user.name,
        email: session?.user.email,
      })
      .then(res => {
        const result = res.data.result;

        if (result && result.length > 0 && result[0].image) {
          const profileImage = result[0].image;
          setProfileImage(profileImage);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [session]);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleProfileButtonClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = event => {
      // Check if the click target is inside the profile button or the dropdown itself
      if (!event.target.closest('.profile-button') && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      // Attach the click event listener to the document when the dropdown is open
      document.addEventListener('click', handleOutsideClick);
    }

    // Cleanup the event listener when the component unmounts or the dropdown is closed
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [profileDropdownOpen]);

  return (
    <>
      <Head>
        <meta name="naver-site-verification" content="6eb3f16b30a15f21d8e43546f8291dc3bc516864" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
            <div className="relative inline-block hidden mobile:block profile-button">
              <button
                type="button"
                className="inline-flex items-center px-0 py-2 text-gray-700"
                onClick={handleProfileButtonClick}
              >
                {profileImage ? (
                  <Image src={profileImage} alt="Profile" width={40} height={40} className="rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500" />
                )}
              </button>
              {profileDropdownOpen && (
                <div className="bg-gray-700 absolute right-0 mt-1 w-56 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 opacity-100 visible transition-all duration-300 z-50 profile-dropdown">
                  <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      className="block w-full text-left px-4 py-2 text-lg font-bold text-white hover:bg-gray-800/50 rounded-t-lg transition-all"
                      role="menuitem"
                      onClick={() => router.push('/bookmark')}
                    >
                      즐겨찾기
                    </button>
                    {admin && (
                      <button
                        className="block w-full text-left px-4 py-2 text-lg font-bold text-white hover:bg-gray-800/50 transition-all"
                        role="menuitem"
                        onClick={() => router.push('/request')}
                      >
                        요청
                      </button>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-lg font-bold text-white hover:bg-gray-800/50 rounded-b-lg transition-all hover:text-rose-500"
                      role="menuitem"
                      onClick={() => signOut('discord')}
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
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
                  {profileImage ? (
                    <Image src={profileImage} alt="Profile" width={40} height={40} className="rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-500" />
                  )}
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
          className={`fixed top-0 left-0 w-full h-full bg-[#202026] z-40 mobile:hidden ${
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
          <p className="text-gray-600 text-sm font-bold text-center mt-4">
            마인크래프트는 Mojang AB의 상표이며, 이 사이트는 Mojang과 관련이 없습니다.
          </p>
        </div>
      </footer>
    </>
  );
}
