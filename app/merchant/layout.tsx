import Link from "next/link";
import { LayoutDashboard, Ticket, Store, BarChart2, Settings, LogOut, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/merchant/dashboard", icon: LayoutDashboard, label: "대시보드", sub: "Dashboard" },
  { href: "/merchant/coupons", icon: Ticket, label: "쿠폰 관리", sub: "Coupons" },
  { href: "/merchant/profile", icon: Store, label: "매장 프로필", sub: "Store Profile" },
  { href: "/merchant/stats", icon: BarChart2, label: "통계", sub: "Statistics" },
  { href: "/merchant/settings", icon: Settings, label: "설정", sub: "Settings" },
];

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8fc] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0B1A30] text-white flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href="/coupons" className="flex items-center gap-1.5">
            <span className="font-black text-white text-lg">N FREE</span>
            <span className="font-black text-[#D4AF37] text-lg">SHOP</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1">가맹점 관리 센터</p>
        </div>

        {/* Merchant info */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-black font-black text-lg">카</div>
            <div>
              <p className="font-semibold text-sm">인천 개항로 카페 1883</p>
              <p className="text-xs text-gray-400">맛집·카페</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ href, icon: Icon, label, sub }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors group">
              <Icon size={18} className="text-gray-400 group-hover:text-white" />
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-[10px] text-gray-500">{sub}</p>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Link href="/coupons" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white text-sm">
            <LogOut size={16} />
            <span>사용자 화면으로</span>
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center gap-2 text-sm text-gray-400">
          <span>가맹점 CMS</span>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">관리</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
