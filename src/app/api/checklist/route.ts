import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ageGroup, answers } = body;

    // 임시 사용자 ID (나중에 인증 시스템으로 대체)
    const tempUserId = "temp-user-id";

    // 먼저 체크리스트 생성
    const checklist = await prisma.checklist.create({
      data: {
        title: `${ageGroup} 체크리스트`,
        ageGroup: ageGroup as any,
      },
    });

    // 질문들을 생성하고 체크리스트와 연결
    const questions = await Promise.all(
      Object.entries(answers).map(([_, content]) =>
        prisma.question.create({
          data: {
            content: content as string,
            checklist: {
              connect: { id: checklist.id }
            }
          },
        })
      )
    );

    // 체크리스트 응답 생성
    const response = await prisma.checklistResponse.create({
      data: {
        userId: tempUserId,
        checklistId: checklist.id,
        answers: {
          create: Object.entries(answers).map(([index, value], i) => ({
            value: value as string,
            questionId: questions[i].id,
          })),
        },
      },
      include: {
        answers: true,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error creating checklist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 