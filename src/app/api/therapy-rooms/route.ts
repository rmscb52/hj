import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// 치료실 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const specialty = searchParams.get('specialty');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    let where: any = {};

    // 이름이나 주소로 검색
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { address: { contains: search } }
      ];
    }

    // 전문 분야로 필터링
    if (specialty) {
      where.specialties = {
        contains: specialty
      };
    }

    const [therapyRooms, total] = await Promise.all([
      prisma.therapyRoom.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.therapyRoom.count({ where })
    ]);

    // JSON 문자열을 배열로 변환
    const formattedRooms = therapyRooms.map(room => ({
      ...room,
      images: JSON.parse(room.images),
      specialties: JSON.parse(room.specialties)
    }));

    return NextResponse.json({
      therapyRooms: formattedRooms,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching therapy rooms:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 치료실 등록 (치료사만 가능)
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
    const {
      name,
      address,
      phone,
      description,
      images,
      specialties,
      latitude,
      longitude
    } = body;

    // 필수 필드 검증
    if (!name || !address || !phone || !description || !specialties || !latitude || !longitude) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 배열을 JSON 문자열로 변환
    const therapyRoom = await prisma.therapyRoom.create({
      data: {
        name,
        address,
        phone,
        description,
        images: JSON.stringify(images || []),
        specialties: JSON.stringify(specialties),
        latitude,
        longitude
      }
    });

    return NextResponse.json({
      ...therapyRoom,
      images: JSON.parse(therapyRoom.images),
      specialties: JSON.parse(therapyRoom.specialties)
    });
  } catch (error) {
    console.error('Error creating therapy room:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 