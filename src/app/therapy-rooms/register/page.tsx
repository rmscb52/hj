'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';

const specialties = [
  '언어치료',
  '놀이치료',
  '미술치료',
  '음악치료',
  '심리치료',
  '감각통합치료',
  '작업치료',
  '물리치료'
];

export default function RegisterTherapyRoomPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');

  // 치료사가 아니면 접근 불가
  if (!session || session.user.role !== 'THERAPIST') {
    router.push('/therapy-rooms');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        description: formData.get('description'),
        specialties: selectedSpecialties,
        images,
        latitude: parseFloat(formData.get('latitude') as string),
        longitude: parseFloat(formData.get('longitude') as string)
      };

      const response = await fetch('/api/therapy-rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '치료실 등록에 실패했습니다.');
      }

      router.push('/therapy-rooms');
    } catch (error) {
      setError(error instanceof Error ? error.message : '치료실 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleAddImage = () => {
    if (imageUrl && !images.includes(imageUrl)) {
      setImages(prev => [...prev, imageUrl]);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">치료실 등록</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              치료실 이름 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              주소 *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              전화번호 *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              설명 *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              전문 분야 *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {specialties.map(specialty => (
                <label
                  key={specialty}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedSpecialties.includes(specialty)}
                    onChange={() => handleSpecialtyToggle(specialty)}
                    className="rounded"
                  />
                  <span>{specialty}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이미지 URL
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="이미지 URL을 입력하세요"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                추가
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {images.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <img
                    src={url}
                    alt={`치료실 이미지 ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                위도 *
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                step="any"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                경도 *
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                step="any"
                required
                className="w-full p-2 border rounded"
              />
            </div>
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