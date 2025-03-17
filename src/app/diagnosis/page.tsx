'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useState } from 'react';

export default function DiagnosisPage() {
  const [posts] = useState([
    {
      id: 1,
      title: '말이 늦은 우리 아이, 언어발달 체크리스트',
      author: '김언어 치료사',
      date: '2024-03-15',
      views: 128,
      category: '체크리스트'
    },
    {
      id: 2,
      title: '연령별 언어발달 이정표',
      author: '박발달 치료사',
      date: '2024-03-14',
      views: 256,
      category: '발달지표'
    },
    {
      id: 3,
      title: '우리 아이 언어발달 검사, 이런 것을 봐주세요',
      author: '이진단 치료사',
      date: '2024-03-13',
      views: 184,
      category: '전문가팁'
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
        transition: 'all 300ms ease-in-out'
      }}>
        <div style={{ width: '100%' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            fontFamily: 'NanumSquareRound, sans-serif',
            color: '#333333'
          }}>
            우리 아이 치료가 필요할까?
          </h1>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{
                  backgroundColor: '#F8F9FC',
                  borderBottom: '1px solid #E5E7EB'
                }}>
                  <th style={{ padding: '1rem', textAlign: 'left', width: '100px' }}>카테고리</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>제목</th>
                  <th style={{ padding: '1rem', textAlign: 'left', width: '120px' }}>작성자</th>
                  <th style={{ padding: '1rem', textAlign: 'center', width: '100px' }}>조회수</th>
                  <th style={{ padding: '1rem', textAlign: 'center', width: '120px' }}>작성일</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} style={{
                    borderBottom: '1px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'background-color 150ms ease-in-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FC'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '1rem', color: '#4A90E2' }}>{post.category}</td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{post.title}</td>
                    <td style={{ padding: '1rem', color: '#666666' }}>{post.author}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#666666' }}>{post.views}</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: '#666666' }}>{post.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#F3F4F6',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                color: '#4B5563',
                cursor: 'pointer'
              }}>
                전체
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                color: '#4B5563',
                cursor: 'pointer'
              }}>
                체크리스트
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                color: '#4B5563',
                cursor: 'pointer'
              }}>
                발달지표
              </button>
              <button style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                color: '#4B5563',
                cursor: 'pointer'
              }}>
                전문가팁
              </button>
            </div>

            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4A90E2',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>✏️</span>
              글쓰기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 