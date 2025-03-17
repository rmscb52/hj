'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path) ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              언어치료 정보 공유
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/checklist"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/checklist')}`}
              >
                체크리스트
              </Link>
              <Link
                href="/therapy-rooms"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/therapy-rooms')}`}
              >
                치료실 찾기
              </Link>
              <Link
                href="/welfare"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/welfare')}`}
              >
                복지 정보
              </Link>
              <Link
                href="/community"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/community')}`}
              >
                커뮤니티
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm">
                  {session.user.name} ({session.user.role === 'PARENT' ? '부모' : '치료사'})
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 