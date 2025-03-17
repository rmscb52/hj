'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navigation from '@/components/Navigation';

const categories = [
  '발달장애인 지원',
  '교육 지원',
  '의료 지원',
  '재활 지원',
  '돌봄 서비스',
  '기타 지원'
];

export default function RegisterWelfarePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 치료사가 아니면 접근 불가
  if (!session || session.user.role !== 'THERAPIST') {
    router.push('/welfare');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        target: formData.get('target'),
        department: formData.get('department'),
        contact: formData.get('contact'),
        link: formData.get('link') || undefined
      };

      const response = await fetch('/api/welfare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '복지 정보 등록에 실패했습니다.');
      }

      router.push('/welfare');
    } catch (error) {
      setError(error instanceof Error ? error.message : '복지 정보 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">복지 정보 등록</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 *
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full p-2 border rounded"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-2">
              지원 대상 *
            </label>
            <input
              type="text"
              id="target"
              name="target"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              담당 부서 *
            </label>
            <input
              type="text"
              id="department"
              name="department"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              연락처 *
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
              관련 링크
            </label>
            <input
              type="url"
              id="link"
              name="link"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              내용 *
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={6}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 