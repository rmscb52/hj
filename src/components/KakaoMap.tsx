'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  width: string;
  height: string;
  centers: Array<{
    id: number;
    name: string;
    address: string;
    lat: number;
    lng: number;
  }>;
}

export default function KakaoMap({ width, height, centers }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadKakaoMap = async () => {
      try {
        // 이미 스크립트가 로드되어 있는지 확인
        if (window.kakao && window.kakao.maps) {
          initializeMap();
          return;
        }

        // 스크립트 로드
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_API_KEY}&autoload=false`;
        
        script.onload = () => {
          if (window.kakao) {
            window.kakao.maps.load(() => {
              initializeMap();
            });
          }
        };

        script.onerror = (error) => {
          console.error('카카오맵 스크립트 로드 실패:', error);
        };

        document.head.appendChild(script);

        return () => {
          // cleanup: 스크립트가 아직 존재하면 제거
          const existingScript = document.querySelector(`script[src="${script.src}"]`);
          if (existingScript) {
            document.head.removeChild(existingScript);
          }
        };
      } catch (error) {
        console.error('카카오맵 초기화 중 에러 발생:', error);
      }
    };

    const initializeMap = () => {
      try {
        if (!mapRef.current || !window.kakao) return;

        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청
          level: 7
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 마커 생성
        centers.forEach(center => {
          try {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(center.lat, center.lng),
              map: map
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;">${center.name}</div>`
            });

            window.kakao.maps.event.addListener(marker, 'mouseover', function() {
              infowindow.open(map, marker);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', function() {
              infowindow.close();
            });
          } catch (markerError) {
            console.error('마커 생성 중 에러 발생:', markerError);
          }
        });
      } catch (error) {
        console.error('지도 초기화 중 에러 발생:', error);
      }
    };

    loadKakaoMap();
  }, [centers]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width, 
        height,
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        fontSize: '0.875rem',
        color: '#666666'
      }}>
        지도를 불러오는 중...
      </div>
    </div>
  );
} 