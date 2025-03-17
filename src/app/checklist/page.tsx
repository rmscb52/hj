import { Navigation } from "@/components/ui/Navigation";
import Link from "next/link";

const ageGroups = [
  { id: 'MONTHS_0_6', label: '0-6개월' },
  { id: 'MONTHS_7_12', label: '7-12개월' },
  { id: 'MONTHS_13_18', label: '13-18개월' },
  { id: 'MONTHS_19_24', label: '19-24개월' },
  { id: 'YEARS_2_3', label: '2-3세' },
  { id: 'YEARS_3_4', label: '3-4세' },
  { id: 'YEARS_4_5', label: '4-5세' },
  { id: 'YEARS_5_6', label: '5-6세' },
];

export default function ChecklistPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            우리 아이 언어발달 체크리스트
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            아이의 연령대를 선택하여 언어발달 상태를 체크해보세요.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ageGroups.map((group) => (
            <Link
              key={group.id}
              href={`/checklist/${group.id}`}
              className="relative group"
            >
              <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium text-gray-900">
                  {group.label}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {group.label} 아이의 언어발달 체크리스트입니다.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 