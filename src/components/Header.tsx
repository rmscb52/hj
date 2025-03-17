'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn('google', {
      callbackUrl: '/',
    }).catch((error) => {
      console.error('로그인 중 오류가 발생했습니다:', error);
    });
  };

  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    }).catch((error) => {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
    });
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      right: 0,
      left: '300px',
      height: '80px',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 2rem',
      zIndex: 10
    }}>
      {session ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{
            fontSize: '1rem',
            color: '#4B5563',
            fontFamily: 'Pretendard, sans-serif'
          }}>
            {session.user?.name}님 환영합니다
          </span>
          <button
            onClick={handleSignOut}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#F3F4F6',
              color: '#4B5563',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontFamily: 'Pretendard, sans-serif',
              transition: 'all 200ms ease-in-out'
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            color: '#4B5563',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 200ms ease-in-out',
            fontFamily: 'Pretendard, sans-serif',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" style={{ flexShrink: 0 }}>
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google 계정으로 로그인
        </button>
      )}
    </header>
  );
} 