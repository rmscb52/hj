import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// 복지 정보 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    let where: any = {};

    // 카테고리로 필터링
    if (category) {
      where.category = category;
    }

    // 제목이나 내용으로 검색
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { target: { contains: search } }
      ];
    }

    const [welfareInfos, total] = await Promise.all([
      prisma.welfareInfo.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.welfareInfo.count({ where })
    ]);

    return NextResponse.json({
      welfareInfos,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching welfare information:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 복지 정보 등록 (치료사만 가능)
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
    const { title, content, category, target, department, contact, link } = body;

    const welfareInfo = await prisma.welfareInfo.create({
      data: {
        title,
        content,
        category,
        target,
        department,
        contact,
        link
      }
    });

    return NextResponse.json(welfareInfo);
  } catch (error) {
    console.error('Error creating welfare information:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 