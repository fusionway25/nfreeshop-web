import { CheckCircle, XCircle, Eye } from "lucide-react";
import { MOCK_COUPONS, MOCK_MERCHANTS } from "@/lib/mock-data";
import Link from "next/link";

const COUPONS_WITH_STATUS = [
  ...MOCK_COUPONS.slice(0, 5).map((c) => ({ ...c, status: "APPROVED", applied: "2026.04.20" })),
  { ...MOCK_COUPONS[5], status: "PENDING", applied: "2026.05.20" },
  { ...MOCK_COUPONS[6], status: "PENDING", applied: "2026.05.21" },
  { ...MOCK_COUPONS[7], status: "REJECTED", applied: "2026.05.18" },
];

const TYPE_LABEL = (type: string, val: number) =>
  type === "PERCENT" ? `${val}% OFF` : type === "FIXED" ? `₩${val.toLocaleString()} OFF` : "FREE GIFT";

const REDEEM_LABEL: Record<string, string> = { SCREEN: "화면제시", BARCODE: "바코드", QR_REVERSE: "QR역방향" };

const STATUS_BADGE: Record<string, string> = {
  APPROVED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  REJECTED: "bg-red-100 text-red-700",
};
const STATUS_TEXT: Record<string, string> = { APPROVED: "승인됨", PENDING: "검토중", REJECTED: "반려됨" };

export default function AdminCouponsPage() {
  const pending = COUPONS_WITH_STATUS.filter((c) => c.status === "PENDING");

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">쿠폰 승인 관리</h1>
          <p className="text-gray-500 text-sm mt-1">가맹점이 등록한 쿠폰을 검토하고 승인합니다.</p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1.5 rounded-full">{pending.length}건 대기</span>
        </div>
      </div>

      {/* Pending section */}
      {pending.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-amber-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-amber-100 bg-amber-50">
            <h2 className="font-bold text-amber-800">승인 대기 ({pending.length})</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {pending.map((c) => {
              const m = MOCK_MERCHANTS.find((m) => m.id === c.merchantId);
              return (
                <div key={c.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🎫</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">{c.titleKo}</p>
                    <p className="text-xs text-gray-500">{m?.nameKo} · {TYPE_LABEL(c.couponType, c.discountValue)} · {REDEEM_LABEL[c.redeemMode]}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{c.applied}</span>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link href={`/coupons/${c.id}`} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                      <Eye size={14} />
                    </Link>
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

      {/* All coupons table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">전체 쿠폰 ({COUPONS_WITH_STATUS.length})</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">쿠폰명</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">가맹점</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">할인</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">방식</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500">상태</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">등록일</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">보기</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {COUPONS_WITH_STATUS.map((c) => {
              const m = MOCK_MERCHANTS.find((m) => m.id === c.merchantId);
              return (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-[180px] truncate">{c.titleKo}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{m?.nameKo}</td>
                  <td className="px-4 py-3 font-bold text-[#D4AF37]">{TYPE_LABEL(c.couponType, c.discountValue)}</td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{REDEEM_LABEL[c.redeemMode]}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[c.status]}`}>{STATUS_TEXT[c.status]}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-gray-400">{c.applied}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/coupons/${c.id}`} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 inline-block">
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
