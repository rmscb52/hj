'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <Header />
      
      <main style={{ 
        marginLeft: '280px',
        marginRight: '280px',
        padding: '0.5rem 1.5rem',
        transition: 'all 300ms ease-in-out'
      }}>
        <div style={{ 
          width: '100%'
        }}>
          <div style={{
            backgroundColor: '#FFF4E6',
            borderRadius: '40px',
            padding: '2rem',
            marginBottom: '1rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            <h1 style={{
              fontSize: '3.75rem',
              fontWeight: 'bold',
              fontFamily: 'NanumSquareRound, sans-serif',
              marginBottom: '1rem',
              color: '#333333',
              lineHeight: '1.2'
            }}>
              우리 아이의 말문을 여는<br />
              가장 따뜻한 방법
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(51, 51, 51, 0.9)',
              marginBottom: '1.5rem',
              fontFamily: 'Pretendard, sans-serif'
            }}>
              부모님과 언어치료 전문가가 함께 만들어가는 더 효과적이고 신뢰할 수 있는 언어치료 환경
            </p>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(51, 51, 51, 0.7)',
              fontStyle: 'italic',
              maxWidth: '42rem',
              fontFamily: 'Pretendard, sans-serif'
            }}>
              * 본 사이트는 특정 기관과 무관하며, 개인이 운영하는 언어치료 정보 공유 플랫폼입니다.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            padding: '0 0.25rem'
          }}>
            <Link href="/diagnosis" style={{ textDecoration: 'none' }}>
              <div className="menu-card">
                <h2 style={{ marginBottom: '0.5rem' }}>우리 아이 치료가 필요할까?</h2>
                <div>아이의 언어 상태를 체크리스트로 쉽게 확인해보세요.</div>
              </div>
            </Link>

            <Link href="/progress" style={{ textDecoration: 'none' }}>
              <div className="menu-card">
                <h2 style={{ marginBottom: '0.5rem' }}>우리 아이 치료는 어떤가요?</h2>
                <div>현재 치료 상태와 언어 발달을 확인해보고,<br />객관성을 위해 여러 명의 의견을 받아보세요.</div>
              </div>
            </Link>

            <Link href="/therapy-rooms" style={{ textDecoration: 'none' }}>
              <div className="menu-card">
                <h2 style={{ marginBottom: '0.5rem' }}>좋은 언어치료실 찾기</h2>
                <div>신뢰할 수 있는 언어치료실을 쉽게 찾아보세요.</div>
              </div>
            </Link>

            <Link href="/voucher" style={{ textDecoration: 'none' }}>
              <div className="menu-card">
                <h2 style={{ marginBottom: '0.5rem' }}>언어치료 바우처 찾기</h2>
                <div>이용 가능한 지원 서비스와 최신 바우처를 확인하세요.</div>
              </div>
            </Link>
          </div>

          {session && session.user.role === 'PARENT' && (
            <div style={{ marginTop: '1rem' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '0.75rem',
                fontFamily: 'NanumSquareRound, sans-serif',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>📂</span> 내 프로젝트
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem'
              }}>
                <div className="dashboard-card" style={{
                  background: 'linear-gradient(to bottom right, #E8F5E9, #E3F2FD)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>👶</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6B7280',
                      fontFamily: 'Pretendard, sans-serif'
                    }}>3세</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    marginBottom: '0.25rem',
                    fontFamily: 'NanumSquareRound, sans-serif'
                  }}>이서연</h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#4B5563',
                    fontFamily: 'Pretendard, sans-serif'
                  }}>마지막 업데이트: 오늘</p>
                </div>
                <div className="dashboard-card" style={{
                  background: 'linear-gradient(to bottom right, #FFF8E1, #E8F5E9)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>👶</span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6B7280',
                      fontFamily: 'Pretendard, sans-serif'
                    }}>4세</span>
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 'bold',
                    marginBottom: '0.25rem',
                    fontFamily: 'NanumSquareRound, sans-serif'
                  }}>이준이</h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#4B5563',
                    fontFamily: 'Pretendard, sans-serif'
                  }}>마지막 업데이트: 2일 전</p>
                </div>
                <button style={{
                  background: 'linear-gradient(to bottom right, #F3F4F6, #E5E7EB)',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 200ms ease-in-out'
                }}>
                  <span style={{
                    fontSize: '1.875rem',
                    color: '#9CA3AF',
                    marginBottom: '0.5rem'
                  }}>➕</span>
                  <span style={{
                    color: '#4B5563',
                    fontFamily: 'Pretendard, sans-serif'
                  }}>새 프로젝트</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
