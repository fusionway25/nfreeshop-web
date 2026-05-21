import AdminChart from "@/components/AdminChart";
import { Store, Ticket, TrendingUp, CheckCircle, Clock, XCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

const KPIS = [
  { label: "전체 가맹점", val: "127", sub: "승인 완료 94", icon: Store, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "활성 쿠폰", val: "348", sub: "이번 달 +42건", icon: Ticket, color: "text-[#D4AF37]", bg: "bg-yellow-50" },
  { label: "누적 사용자", val: "18,420", sub: "외국인 72%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "이번 달 리딤", val: "9,182", sub: "전달 대비 +31%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
];

const PENDING_MERCHANTS = [
  { name: "송도 K-푸드 레스토랑", category: "맛집·카페", applied: "2026.05.20", contact: "010-1234-5678" },
  { name: "인천항 기념품샵", category: "쇼핑", applied: "2026.05.21", contact: "032-456-7890" },
  { name: "영종도 해녀 체험", category: "관광·체험", applied: "2026.05.21", contact: "010-9876-5432" },
];

const PENDING_COUPONS = [
  { merchant: "인천 개항로 카페 1883", title: "케이크 20% 할인", type: "PERCENT", applied: "2026.05.21" },
  { merchant: "송도 신세계 면세점", title: "뷰티 세트 ₩20,000 OFF", type: "FIXED", applied: "2026.05.20" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">관리자 대시보드</h1>
        <p className="text-gray-500 text-sm mt-1">N FREE SHOP 전체 플랫폼 현황 · 2026년 5월 21일</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${k.bg} rounded-xl flex items-center justify-center mb-3`}>
              <k.icon size={20} className={k.color} />
            </div>
            <div className="text-2xl font-black text-gray-900">{k.val}</div>
            <div className="text-xs text-gray-500 mt-0.5">{k.label}</div>
            <div className="text-xs text-gray-400 mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart + Approval queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">플랫폼 사용 현황 (최근 30일)</h2>
          </div>
          <AdminChart />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">승인 대기 현황</h2>
          <div className="space-y-3">
            {[
              { label: "가맹점 신규 신청", count: 3, color: "bg-blue-500", href: "/admin/merchants" },
              { label: "쿠폰 등록 요청", count: 2, color: "bg-yellow-500", href: "/admin/coupons" },
              { label: "정보 수정 요청", count: 1, color: "bg-purple-500", href: "/admin/merchants" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{item.count}</span>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <div className="font-black text-green-600 text-lg">94</div>
              <div className="text-gray-400">승인완료</div>
            </div>
            <div>
              <div className="font-black text-yellow-600 text-lg">6</div>
              <div className="text-gray-400">검토중</div>
            </div>
            <div>
              <div className="font-black text-red-500 text-lg">2</div>
              <div className="text-gray-400">반려</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pending merchants */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">가맹점 신규 신청</h2>
            <Link href="/admin/merchants" className="text-xs text-[#0B1A30] font-medium">전체 보기</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {PENDING_MERCHANTS.map((m) => (
              <div key={m.name} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🏪</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{m.name}</p>
                  <p className="text-xs text-gray-400">{m.category} · {m.applied}</p>
                </div>
                <div className="flex gap-1">
                  <button className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-green-200 transition-colors">
                    <CheckCircle size={11} />승인
                  </button>
                  <button className="flex items-center gap-1 bg-red-50 text-red-500 text-xs font-semibold px-2 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                    <XCircle size={11} />반려
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending coupons */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">쿠폰 등록 요청</h2>
            <Link href="/admin/coupons" className="text-xs text-[#0B1A30] font-medium">전체 보기</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {PENDING_COUPONS.map((c) => (
              <div key={c.title} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-9 h-9 bg-yellow-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🎫</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{c.title}</p>
                  <p className="text-xs text-gray-400">{c.merchant} · {c.applied}</p>
                </div>
                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                  <Clock size={9} className="inline mr-0.5" />검토중
                </span>
                <div className="flex gap-1">
                  <button className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-green-200">승인</button>
                  <button className="bg-red-50 text-red-500 text-xs font-semibold px-2 py-1.5 rounded-lg hover:bg-red-100">반려</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
