'use client';

import { useEffect, useRef } from 'react';

interface MapProps {
  centers: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  }>;
  userLocation: { lat: number; lng: number } | null;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map({ centers, userLocation }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const center = userLocation || { lat: 37.5665, lng: 126.9780 }; // 기본값: 서울시청
        const options = {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: 7
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);
        mapInstanceRef.current = map;

        // 사용자 위치 마커
        if (userLocation) {
          new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
            image: new window.kakao.maps.MarkerImage(
              '/user-location.png', // 사용자 위치 마커 이미지
              new window.kakao.maps.Size(24, 24)
            )
          });
        }

        // 치료실 마커들
        centers.forEach(center => {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(center.latitude, center.longitude)
          });

          // 인포윈도우 생성
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div class="p-2">${center.name}</div>`
          });

          // 마커 클릭 이벤트
          window.kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [centers, userLocation]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  );
} 