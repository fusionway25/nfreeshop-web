"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewCouponPage() {
  const [redeemMode, setRedeemMode] = useState("SCREEN");
  const [couponType, setCouponType] = useState("PERCENT");

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/merchant/coupons" className="p-2 hover:bg-gray-200 rounded-lg text-gray-500">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">새 쿠폰 등록</h1>
          <p className="text-gray-500 text-sm">등록 후 관리자 승인이 필요합니다.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
        {/* 쿠폰 타입 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">할인 타입</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "PERCENT", label: "% 할인", icon: "%" },
              { val: "FIXED", label: "금액 할인", icon: "₩" },
              { val: "GIFT", label: "무료 증정", icon: "🎁" },
            ].map((t) => (
              <button key={t.val} onClick={() => setCouponType(t.val)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${couponType === t.val ? "border-[#0B1A30] bg-[#0B1A30] text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                <div className="text-lg font-bold">{t.icon}</div>
                <div className="text-xs mt-1">{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 쿠폰명 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">쿠폰명 (한국어) <span className="text-red-500">*</span></label>
            <input type="text" placeholder="예: 아메리카노 2+1" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">쿠폰명 (English)</label>
            <input type="text" placeholder="e.g. Buy 2 Get 1 Free Americano" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">쿠폰명 (日本語)</label>
            <input type="text" placeholder="例：アメリカーノ2+1" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">쿠폰명 (中文)</label>
            <input type="text" placeholder="例：美式咖啡买二送一" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
        </div>

        {/* 할인 금액 */}
        {couponType !== "GIFT" && (
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              할인 {couponType === "PERCENT" ? "비율 (%)" : "금액 (₩)"}
            </label>
            <input type="number" placeholder={couponType === "PERCENT" ? "예: 20" : "예: 10000"} className="w-32 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
        )}

        {/* 사용 방식 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">쿠폰 사용 방식</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "SCREEN", label: "화면 제시형", icon: "📱", desc: "화면 보여주면 즉시 할인" },
              { val: "BARCODE", label: "바코드 스캔", icon: "〓", desc: "바코드로 POS 처리" },
              { val: "QR_REVERSE", label: "QR 역방향", icon: "⊡", desc: "매장 QR 촬영 → 즉시 활성화" },
            ].map((m) => (
              <button key={m.val} onClick={() => setRedeemMode(m.val)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${redeemMode === m.val ? "border-[#0B1A30] bg-[#0B1A30]/5" : "border-gray-200 hover:border-gray-300"}`}>
                <div className="text-xl mb-1">{m.icon}</div>
                <div className="text-xs font-bold text-gray-900">{m.label}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 유효기간 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">시작일</label>
            <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">종료일 <span className="text-red-500">*</span></label>
            <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
        </div>

        {/* 이미지 */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">쿠폰 이미지</label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 cursor-pointer transition-colors">
            <div className="text-3xl mb-2">🖼️</div>
            <p className="text-sm text-gray-500">이미지를 드래그하거나 클릭하여 업로드</p>
            <p className="text-xs text-gray-400 mt-1">권장: 800×600px, JPG/PNG</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-[#0B1A30] text-white font-bold py-3.5 rounded-2xl hover:bg-[#1a2f4f] transition-colors shadow-md">
          쿠폰 등록 신청 (관리자 승인 필요)
        </button>
        <Link href="/merchant/coupons" className="px-6 py-3.5 border border-gray-200 text-gray-600 rounded-2xl text-sm font-medium hover:bg-gray-50 transition-colors">
          취소
        </Link>
      </div>
    </div>
  );
}
