'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import KakaoMap from '@/components/KakaoMap';
import { useState } from 'react';

interface Center {
  id: number;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  image: string;
  lat: number;
  lng: number;
  type: '발달센터' | '소아과';
}

interface Voucher {
  id: number;
  title: string;
  description: string;
  target: string;
  support: string;
}

export default function TherapyRoomsPage() {
  const [centers] = useState<Center[]>([
    {
      id: 1,
      name: '집소아동발달센터',
      address: '관악구에서 6.00km',
      rating: 4.8,
      reviewCount: 48,
      specialties: ['사회성', '운동', '특수재활'],
      image: '/images/center1.jpg',
      lat: 37.5665,
      lng: 126.9780,
      type: '발달센터'
    },
    {
      id: 2,
      name: '우리아동청소년센터',
      address: '관악구에서 9.28km',
      rating: 4.9,
      reviewCount: 36,
      specialties: ['언어', '놀이', '심리'],
      image: '/images/center2.jpg',
      lat: 37.5028,
      lng: 127.0244,
      type: '발달센터'
    }
  ]);

  const [vouchers] = useState<Voucher[]>([
    {
      id: 1,
      title: '발달재활서비스 바우처',
      description: '장애아동의 인지, 의사소통 등 기능향상과 행동발달을 위한 적절한 발달재활서비스 지원',
      target: '만 18세 미만 장애아동',
      support: '월 14~22만원 지원'
    },
    {
      id: 2,
      title: '언어발달지원 바우처',
      description: '부모의 실직, 질병 등으로 인한 언어발달 지연 아동에 대한 언어발달 지원',
      target: '만 12세 미만 비장애아동',
      support: '월 16~22만원 지원'
    }
  ]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <Header />
      
      <main style={{ 
        marginLeft: '280px',
        marginRight: '280px',
        padding: '0.5rem 1.5rem',
        transition: 'all 300ms ease-in-out',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {/* 상단 검색 섹션 */}
        <section style={{
          flex: '2',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            fontFamily: 'NanumSquareRound, sans-serif',
            color: '#333333',
            marginBottom: '0.25rem'
          }}>
            언어치료실 찾기
          </h1>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <input
              type="text"
              placeholder="지역, 센터명 검색"
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                width: '480px',
                fontSize: '1rem'
              }}
            />
            <button style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#4A90E2',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              검색
            </button>
          </div>

          <div style={{ 
            height: '180px',
            marginBottom: '0.5rem'
          }}>
            <KakaoMap
              width="100%"
              height="100%"
              centers={centers}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            flex: 1,
            overflow: 'auto'
          }}>
            {centers.map((center) => (
              <div key={center.id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 150ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
              >
                <div style={{
                  height: '160px',
                  backgroundColor: '#F3F4F6',
                  backgroundImage: `url(${center.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} />
                <div style={{ padding: '1rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: 'bold'
                    }}>
                      {center.name}
                    </h3>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#E3F2FD',
                      color: '#1976D2',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {center.type}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#666666',
                    marginBottom: '0.5rem'
                  }}>
                    {center.address}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: '#4A90E2', fontSize: '1rem' }}>★ {center.rating}</span>
                    <span style={{ color: '#666666', fontSize: '0.875rem' }}>
                      리뷰 {center.reviewCount}개
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                    {center.specialties.map((specialty, index) => (
                      <span key={index} style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        color: '#4B5563'
                      }}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 하단 바우처 섹션 */}
        <section style={{
          flex: '1',
          borderTop: '1px solid #E5E7EB',
          paddingTop: '0.5rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#333333'
          }}>
            언어치료 바우처 안내
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            height: 'calc(100% - 2rem)',
            overflow: 'auto'
          }}>
            {vouchers.map((voucher) => (
              <div key={voucher.id} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: '#4A90E2'
                }}>
                  {voucher.title}
                </h3>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#666666',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4'
                }}>
                  {voucher.description}
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#4B5563',
                      width: '60px'
                    }}>
                      지원대상
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#666666'
                    }}>
                      {voucher.target}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#4B5563',
                      width: '60px'
                    }}>
                      지원금액
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#666666'
                    }}>
                      {voucher.support}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 