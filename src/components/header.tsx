"use client";

import Image from "next/image";

export default function Header() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='w-full p-4 bg-[#ffb8b8]'>
      <div className='max-w-[1200px] mx-auto relative'>
        {/* <button
          className='absolute left-0 top-0 hover:bg-gray-100 rounded-lg transition-colors'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          </svg>
        </button> */}
      </div>
      <div className='flex justify-center items-center'>
        <Image src='/images/logo.png' alt='logo' width={100} height={100} />
      </div>
      {/* 사이드 메뉴 */}
      {/* <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className='p-4'>
          <div className='flex justify-end'>
            <button
              onClick={() => setIsMenuOpen(false)}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <nav className='mt-8'>
            <ul className='space-y-4'>
              <li>
                <a
                  href='#'
                  className='block p-2 hover:bg-gray-100 rounded-lg transition-colors'
                >
                  홈
                </a>
              </li>

              <li>
                <a
                  href='#'
                  className='block p-2 hover:bg-gray-100 rounded-lg transition-colors'
                >
                  소개
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block p-2 hover:bg-gray-100 rounded-lg transition-colors'
                >
                  문의하기
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div> */}
      {/* 오버레이 */}
      {/* {isMenuOpen && (
        <div
          className='fixed inset-0 bg-opacity-50 z-40'
          onClick={() => setIsMenuOpen(false)}
        />
      )} */}
    </header>
  );
}
