import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// 좋아요 토글
export async function POST(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId: params.postId,
          userId: session.user.id
        }
      }
    });

    if (existingLike) {
      // 좋아요 취소
      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      });

      return NextResponse.json({ liked: false });
    } else {
      // 좋아요 추가
      await prisma.like.create({
        data: {
          postId: params.postId,
          userId: session.user.id
        }
      });

      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 