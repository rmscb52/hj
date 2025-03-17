'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = {
  MONTHS_0_6: [
    '아이가 소리에 반응하나요?',
    '옹알이를 하나요?',
    '웃음소리를 내나요?',
    '주변 사람의 목소리에 반응하나요?',
  ],
  MONTHS_7_12: [
    '마마, 파파 등의 의미 있는 소리를 내나요?',
    '간단한 지시에 반응하나요?',
    '손가락으로 원하는 것을 가리키나요?',
    '다양한 소리를 내며 놀이하나요?',
  ],
  // 다른 연령대의 질문들도 추가 예정
};

type ChecklistFormProps = {
  ageGroup: string;
};

export function ChecklistForm({ ageGroup }: ChecklistFormProps) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const currentQuestions = questions[ageGroup as keyof typeof questions] || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ageGroup,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error('체크리스트 제출에 실패했습니다.');
      }

      const data = await response.json();
      router.push(`/checklist/result/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {currentQuestions.map((question, index) => (
        <div key={index} className="space-y-4">
          <fieldset>
            <legend className="text-base font-medium text-gray-900">
              {index + 1}. {question}
            </legend>
            <div className="mt-4 space-x-4">
              {['매우 그렇다', '그렇다', '보통이다', '그렇지 않다', '전혀 그렇지 않다'].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={(e) => setAnswers({ ...answers, [index]: e.target.value })}
                    className="form-radio h-4 w-4 text-blue-600"
                    required
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      ))}

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? '제출 중...' : '제출하기'}
          </button>
        </div>
      </div>
    </form>
  );
} 