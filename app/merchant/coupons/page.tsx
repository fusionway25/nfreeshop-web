import Link from "next/link";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { MOCK_COUPONS } from "@/lib/mock-data";

const MOCK_MERCHANT_ID = "m-1";
const merchantCoupons = MOCK_COUPONS.filter((c) => c.merchantId === MOCK_MERCHANT_ID).map((c) => ({
  ...c,
  downloads: Math.floor(Math.random() * 400 + 50),
  redeems: Math.floor(Math.random() * 100 + 20),
  status: c.id === "c-1" ? "APPROVED" : "PENDING",
}));

const STATUS_BADGE: Record<string, string> = {
  APPROVED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  REJECTED: "bg-red-100 text-red-700",
};
const TYPE_LABEL = (type: string, val: number) =>
  type === "PERCENT" ? `${val}% OFF` : type === "FIXED" ? `₩${val.toLocaleString()} OFF` : "FREE GIFT";
const REDEEM_LABEL: Record<string, string> = { SCREEN: "화면제시", BARCODE: "바코드", QR_REVERSE: "QR역방향" };

export default function MerchantCouponsPage() {
  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">쿠폰 관리</h1>
          <p className="text-gray-500 text-sm mt-1">등록한 쿠폰을 관리하고 성과를 확인하세요.</p>
        </div>
        <Link href="/merchant/coupons/new" className="flex items-center gap-2 bg-[#0B1A30] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1a2f4f] transition-colors shadow-md">
          <Plus size={16} />새 쿠폰 등록
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "전체 쿠폰", val: merchantCoupons.length, color: "text-gray-900" },
          { label: "승인됨", val: merchantCoupons.filter(c => c.status === "APPROVED").length, color: "text-green-600" },
          { label: "검토중", val: merchantCoupons.filter(c => c.status === "PENDING").length, color: "text-yellow-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className={`text-3xl font-black ${s.color}`}>{s.val}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs">쿠폰명</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs">타입</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs">사용방식</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-500 text-xs">상태</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs">다운로드</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs">리딤</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {merchantCoupons.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-gray-900">{c.titleKo}</p>
                  <p className="text-xs text-gray-400">{c.titleEn}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="font-bold text-[#D4AF37]">{TYPE_LABEL(c.couponType, c.discountValue)}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{REDEEM_LABEL[c.redeemMode]}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[c.status]}`}>
                    {c.status === "APPROVED" ? "승인됨" : "검토중"}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-bold text-gray-900">{c.downloads}</td>
                <td className="px-4 py-4 text-right font-bold text-green-600">{c.redeems}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/coupons/${c.id}`} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700">
                      <Eye size={14} />
                    </Link>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700">
                      <Edit2 size={14} />
                    </button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
