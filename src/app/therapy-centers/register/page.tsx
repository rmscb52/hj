'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navigation from '@/components/Navigation';

export default function RegisterTherapyCenterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 치료사가 아닌 경우 접근 제한
  if (!session || session.user.role !== 'THERAPIST') {
    router.push('/therapy-centers');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        description: formData.get('description'),
        specialties: Array.from(formData.getAll('specialties')),
        images: [], // 이미지 업로드 기능은 추후 구현
        latitude: parseFloat(formData.get('latitude') as string),
        longitude: parseFloat(formData.get('longitude') as string),
      };

      const response = await fetch('/api/therapy-centers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('치료실 등록에 실패했습니다.');
      }

      router.push('/therapy-centers');
    } catch (err) {
      setError(err instanceof Error ? err.message : '치료실 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">치료실 등록</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              치료실 이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
              주소
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              전화번호
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              설명
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              전문 분야
            </label>
            <div className="space-y-2">
              {['언어치료', '놀이치료', '미술치료', '음악치료'].map((specialty) => (
                <label key={specialty} className="flex items-center">
                  <input
                    type="checkbox"
                    name="specialties"
                    value={specialty}
                    className="mr-2"
                  />
                  {specialty}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="latitude" className="block text-gray-700 font-semibold mb-2">
                위도
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                step="0.000001"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-gray-700 font-semibold mb-2">
                경도
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                step="0.000001"
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded font-semibold text-white ${
              isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? '등록 중...' : '치료실 등록하기'}
          </button>
        </form>
      </main>
    </div>
  );
} 