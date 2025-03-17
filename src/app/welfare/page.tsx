'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

interface WelfareInfo {
  id: string;
  title: string;
  content: string;
  category: string;
  target: string;
  department: string;
  contact: string;
  link?: string;
  createdAt: string;
}

const categories = [
  '전체',
  '발달장애인 지원',
  '교육 지원',
  '의료 지원',
  '재활 지원',
  '돌봄 서비스',
  '기타 지원'
];

export default function WelfarePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [welfareInfos, setWelfareInfos] = useState<WelfareInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchWelfareInfos = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (selectedCategory !== '전체') params.append('category', selectedCategory);
        params.append('page', currentPage.toString());

        const response = await fetch(`/api/welfare?${params}`);
        if (!response.ok) {
          throw new Error('복지 정보를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setWelfareInfos(data.welfareInfos);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error instanceof Error ? error.message : '복지 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWelfareInfos();
  }, [search, selectedCategory, currentPage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">복지 정보</h1>
          {session?.user.role === 'THERAPIST' && (
            <button
              onClick={() => router.push('/welfare/register')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              정보 등록
            </button>
          )}
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="제목, 내용, 지원 대상으로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : (
          <div className="space-y-6">
            {welfareInfos.map((info) => (
              <div key={info.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{info.title}</h2>
                    <div className="flex gap-2 text-sm text-gray-600">
                      <span>{formatDate(info.createdAt)}</span>
                      <span>•</span>
                      <span>{info.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">지원 대상</h3>
                    <p className="text-gray-600">{info.target}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">담당 부서</h3>
                    <p className="text-gray-600">{info.department}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">연락처</h3>
                    <p className="text-gray-600">{info.contact}</p>
                  </div>
                  {info.link && (
                    <div>
                      <h3 className="font-semibold text-gray-700">관련 링크</h3>
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        자세히 보기
                      </a>
                    </div>
                  )}
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 