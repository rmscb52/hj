'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Navigation from '@/components/Navigation';
import Map from '@/components/Map';

interface TherapyCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  images: string[];
  specialties: string[];
  latitude: number;
  longitude: number;
}

export default function TherapyCentersPage() {
  const { data: session } = useSession();
  const [centers, setCenters] = useState<TherapyCenter[]>([]);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // 사용자 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (specialty) params.append('specialty', specialty);
        if (userLocation) {
          params.append('lat', userLocation.lat.toString());
          params.append('lng', userLocation.lng.toString());
        }

        const response = await fetch(`/api/therapy-centers?${params}`);
        const data = await response.json();
        setCenters(data);
      } catch (error) {
        console.error('치료실 정보를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchCenters();
  }, [search, specialty, userLocation]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">치료실 찾기</h1>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="치료실 이름 또는 주소로 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">전체 분야</option>
            <option value="언어치료">언어치료</option>
            <option value="놀이치료">놀이치료</option>
            <option value="미술치료">미술치료</option>
            <option value="음악치료">음악치료</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-4 h-[600px] overflow-y-auto">
            {centers.map((center) => (
              <div key={center.id} className="mb-6 p-4 border rounded hover:bg-gray-50">
                <h2 className="text-xl font-semibold mb-2">{center.name}</h2>
                <p className="text-gray-600 mb-2">{center.address}</p>
                <p className="text-gray-600 mb-2">{center.phone}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {center.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">{center.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4 h-[600px]">
            <Map
              centers={centers}
              userLocation={userLocation}
            />
          </div>
        </div>

        {session?.user.role === 'THERAPIST' && (
          <button
            onClick={() => window.location.href = '/therapy-centers/register'}
            className="fixed bottom-8 right-8 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            치료실 등록하기
          </button>
        )}
      </main>
    </div>
  );
} 