import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// 치료실 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get('specialty');
    const search = searchParams.get('search');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '5'; // 기본 반경 5km

    let where: any = {};

    // 전문 분야로 필터링
    if (specialty) {
      where.specialties = {
        has: specialty
      };
    }

    // 이름이나 주소로 검색
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { address: { contains: search } }
      ];
    }

    // 위치 기반 검색
    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const radiusKm = parseFloat(radius);

      // Haversine 공식을 사용한 거리 계산
      where.AND = [
        {
          latitude: {
            gte: latitude - radiusKm / 111.32, // 위도 1도 = 약 111.32km
            lte: latitude + radiusKm / 111.32
          }
        },
        {
          longitude: {
            gte: longitude - radiusKm / (111.32 * Math.cos(latitude * Math.PI / 180)),
            lte: longitude + radiusKm / (111.32 * Math.cos(latitude * Math.PI / 180))
          }
        }
      ];
    }

    const centers = await prisma.therapyCenter.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(centers);
  } catch (error) {
    console.error('Error fetching therapy centers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 치료실 등록 (관리자 또는 치료사만 가능)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'THERAPIST') {
      return NextResponse.json(
        { error: '권한이 없습니다.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, address, phone, description, images, specialties, latitude, longitude } = body;

    const center = await prisma.therapyCenter.create({
      data: {
        name,
        address,
        phone,
        description,
        images,
        specialties,
        latitude,
        longitude
      }
    });

    return NextResponse.json(center);
  } catch (error) {
    console.error('Error creating therapy center:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 