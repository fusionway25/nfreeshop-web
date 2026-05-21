import BottomNav from "@/components/BottomNav";
import { MOCK_MERCHANTS, MOCK_COUPONS, MOCK_CATEGORIES } from "@/lib/mock-data";
import Link from "next/link";
import { MapPin, Ticket } from "lucide-react";
import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">🗺️</div>
        <p className="text-blue-600 text-sm font-medium">지도 로딩 중...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const merchantsWithCoupons = MOCK_MERCHANTS.map((m) => ({
    ...m,
    couponCount: MOCK_COUPONS.filter((c) => c.merchantId === m.id).length,
    category: MOCK_CATEGORIES.find((cat) => cat.id === m.categoryId),
  }));

  return (
    <div className="min-h-screen bg-[#f7f8fc] flex flex-col">
      {/* Header */}
      <div className="bg-[#0B1A30] text-white px-6 pt-5 pb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black">쿠폰 지도</h1>
            <p className="text-xs text-[#D4AF37] mt-0.5">내 주변 가맹점 · Nearby Merchants</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin size={12} />
            <span>{merchantsWithCoupons.length}개 가맹점</span>
          </div>
        </div>
      </div>

      {/* Map area */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 130px)" }}>
        {/* Map */}
        <div className="flex-1 relative">
          <MapClient merchants={merchantsWithCoupons} />
        </div>

        {/* Sidebar - merchant list */}
        <aside className="hidden lg:flex flex-col w-72 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">가맹점 목록</p>
          </div>
          {merchantsWithCoupons.map((m) => (
            <Link key={m.id} href={`/coupons?merchant=${m.id}`}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors group">
              <div className="w-10 h-10 bg-[#0B1A30]/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                {m.category?.icon ?? "🏪"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate group-hover:text-[#0B1A30]">{m.nameKo}</p>
                <p className="text-xs text-gray-400 truncate">{m.addressKo}</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1 text-xs text-[#D4AF37] font-bold">
                <Ticket size={11} />
                {m.couponCount}
              </div>
            </Link>
          ))}
        </aside>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
