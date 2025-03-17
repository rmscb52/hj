'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navigation from '@/components/Navigation';

const categories = ['질문', '정보공유', '일상'];

export default function WritePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 로그인하지 않은 경우 접근 제한
  if (!session) {
    router.push('/community');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category')
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('게시글 작성에 실패했습니다.');
      }

      router.push('/community');
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">글쓰기</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
              카테고리
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full p-2 border rounded"
            >
              <option value="">카테고리 선택</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
              내용
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={10}
              className="w-full p-2 border rounded"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded font-semibold text-white ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 