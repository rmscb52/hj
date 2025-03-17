'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <Link href="/" style={{ 
        textDecoration: 'none',
        display: 'block',
        margin: '1rem 1rem 2rem 1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.75rem 1rem',
          backgroundColor: 'white',
          borderRadius: '18px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 200ms ease-in-out',
          border: '1px solid #E8EBF0'
        }}>
          <h1 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#333333',
            margin: 0,
            fontFamily: 'NanumSquareRound, sans-serif'
          }}>
            NEIDO 홈으로
          </h1>
        </div>
      </Link>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Link href="/diagnosis" style={{ textDecoration: 'none' }}>
          <div className={`sidebar-item ${pathname === '/diagnosis' ? 'active' : ''}`}>
            우리 아이 치료가 필요할까?
          </div>
        </Link>

        <Link href="/progress" style={{ textDecoration: 'none' }}>
          <div className={`sidebar-item ${pathname === '/progress' ? 'active' : ''}`}>
            우리 아이 치료는 어떤가요?
          </div>
        </Link>

        <Link href="/therapy-rooms" style={{ textDecoration: 'none' }}>
          <div className={`sidebar-item ${pathname === '/therapy-rooms' ? 'active' : ''}`}>
            좋은 언어치료실 찾기
          </div>
        </Link>

        <Link href="/voucher" style={{ textDecoration: 'none' }}>
          <div className={`sidebar-item ${pathname === '/voucher' ? 'active' : ''}`}>
            언어치료 바우처 찾기
          </div>
        </Link>
      </nav>
    </div>
  );
} 