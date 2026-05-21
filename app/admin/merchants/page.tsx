import { CheckCircle, XCircle, Eye, MapPin } from "lucide-react";
import { MOCK_MERCHANTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import Link from "next/link";

const MERCHANTS_WITH_STATUS = [
  ...MOCK_MERCHANTS.slice(0, 5).map((m) => ({ ...m, status: "APPROVED", applied: "2026.04.15" })),
  { ...MOCK_MERCHANTS[5], status: "PENDING", applied: "2026.05.20" },
  { ...MOCK_MERCHANTS[6], status: "PENDING", applied: "2026.05.21" },
  { id: "m-new-1", nameKo: "송도 K-푸드 레스토랑", nameEn: "Songdo K-Food", categoryId: "cat-1", addressKo: "인천 연수구 송도동 100", addressEn: null, lat: 37.39, lng: 126.64, thumbnailUrl: null, description: null, status: "PENDING", applied: "2026.05.21" },
];

const STATUS_BADGE: Record<string, string> = {
  APPROVED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default function AdminMerchantsPage() {
  const pending = MERCHANTS_WITH_STATUS.filter((m) => m.status === "PENDING");
  const approved = MERCHANTS_WITH_STATUS.filter((m) => m.status === "APPROVED");

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">가맹점 승인 관리</h1>
          <p className="text-gray-500 text-sm mt-1">신규 가맹점 신청을 검토하고 승인합니다.</p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1.5 rounded-full">{pending.length}건 대기</span>
          <span className="bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-full">{approved.length}건 승인</span>
        </div>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-amber-100 bg-amber-50">
            <h2 className="font-bold text-amber-800">승인 대기 ({pending.length})</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {pending.map((m) => {
              const cat = MOCK_CATEGORIES.find((c) => c.id === m.categoryId);
              return (
                <div key={m.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-xl">
                    {cat?.icon ?? "🏪"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">{m.nameKo}</p>
                    <p className="text-xs text-gray-400">{m.nameEn} · {cat?.nameKo}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={10} />{m.addressKo}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{m.applied}</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-green-700 transition-colors">
                      <CheckCircle size={12} />승인
                    </button>
                    <button className="flex items-center gap-1.5 bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-xl hover:bg-red-200 transition-colors">
                      <XCircle size={12} />반려
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Approved */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">승인된 가맹점 ({approved.length})</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">가맹점</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">카테고리</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">주소</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">상태</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">등록일</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {approved.map((m) => {
              const cat = MOCK_CATEGORIES.find((c) => c.id === m.categoryId);
              return (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900">{m.nameKo}</p>
                    <p className="text-xs text-gray-400">{m.nameEn}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{cat?.icon} {cat?.nameKo}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate">{m.addressKo}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[m.status]}`}>승인됨</span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-gray-400">{m.applied}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/coupons?merchant=${m.id}`} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 inline-block">
                      <Eye size={14} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
