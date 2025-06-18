import Link from "next/link";

export default function Footer() {
  return (
    <footer className='w-full bg-white/10 backdrop-blur-sm py-8 mt-auto'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* 왼쪽 섹션 - 프로젝트 소개 */}
          <div className='space-y-4'>
            <h2 className='text-xl font-bold text-white'>Quis Sum</h2>
            <p className='text-white/80 text-sm'>
              당신의 내면을 탐구하는 심리 테스트 서비스입니다. 자신을 더 깊이
              이해하고 성장하는 여정을 시작하세요.
            </p>
          </div>

          {/* 중앙 섹션 - 빠른 링크 */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-white'>바로가기</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-white/80 hover:text-white transition-colors'
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-white/80 hover:text-white transition-colors'
                >
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-white/80 hover:text-white transition-colors'
                >
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 오른쪽 섹션 - 연락처 */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-white'>연락처</h3>
            <ul className='space-y-2 text-white/80'>
              <li>Email: contact@quissum.com</li>
              <li>Instagram: @quissum</li>
              <li>Twitter: @quissum</li>
            </ul>
          </div>
        </div>

        {/* 저작권 정보 */}
        <div className='mt-8 pt-8 border-t border-white/10'>
          <p className='text-center text-white/60 text-sm'>
            © {new Date().getFullYear()} Quis Sum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
