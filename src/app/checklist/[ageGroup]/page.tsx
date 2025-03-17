import { Navigation } from "@/components/ui/Navigation";
import { ChecklistForm } from "@/components/forms/ChecklistForm";

export default function AgeGroupChecklistPage({
  params,
}: {
  params: { ageGroup: string };
}) {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {params.ageGroup.replace('_', '-')} 체크리스트
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            아이의 현재 상태에 대해 답변해주세요.
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <ChecklistForm ageGroup={params.ageGroup} />
          </div>
        </div>
      </div>
    </div>
  );
} 