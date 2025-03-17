import { Navigation } from "@/components/ui/Navigation";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ChecklistResultPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await prisma.checklistResponse.findUnique({
    where: { id: params.id },
    include: {
      checklist: true,
      answers: {
        include: {
          question: true,
        },
      },
      feedback: true,
    },
  });

  if (!response) {
    notFound();
  }

  const getScoreColor = (value: string) => {
    const scores: Record<string, string> = {
      '매우 그렇다': 'text-green-600',
      '그렇다': 'text-green-500',
      '보통이다': 'text-yellow-500',
      '그렇지 않다': 'text-red-500',
      '전혀 그렇지 않다': 'text-red-600',
    };
    return scores[value] || 'text-gray-500';
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            체크리스트 결과
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            {response.checklist.title}
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {response.answers.map((answer, index) => (
                <div key={answer.id} className="border-b pb-4 last:border-b-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {index + 1}. {answer.question.content}
                  </h3>
                  <p className={`text-sm ${getScoreColor(answer.value)}`}>
                    답변: {answer.value}
                  </p>
                </div>
              ))}
            </div>

            {!response.feedback && (
              <div className="mt-8 bg-yellow-50 p-4 rounded-md">
                <p className="text-sm text-yellow-700">
                  전문가의 피드백을 기다리고 있습니다. 피드백이 등록되면 이메일로 알려드리겠습니다.
                </p>
              </div>
            )}

            {response.feedback && (
              <div className="mt-8 bg-blue-50 p-4 rounded-md">
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  전문가 피드백
                </h3>
                <p className="text-sm text-blue-700">
                  {response.feedback.content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 