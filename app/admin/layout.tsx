import Link from "next/link";
import { LayoutDashboard, Store, Ticket, BarChart2, Settings, Shield, LogOut, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "관리자 대시보드" },
  { href: "/admin/merchants", icon: Store, label: "가맹점 승인" },
  { href: "/admin/coupons", icon: Ticket, label: "쿠폰 승인" },
  { href: "/admin/stats", icon: BarChart2, label: "전체 통계" },
  { href: "/admin/settings", icon: Settings, label: "시스템 설정" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f8fc] flex">
      <aside className="w-60 bg-[#0B1A30] text-white flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-[#D4AF37]" />
            <span className="font-black text-sm text-[#D4AF37] uppercase tracking-wider">Admin CMS</span>
          </div>
          <Link href="/coupons" className="flex items-center gap-1">
            <span className="font-black text-white text-lg">N FREE</span>
            <span className="font-black text-[#D4AF37] text-lg">SHOP</span>
          </Link>
        </div>

        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <Shield size={18} className="text-red-400" />
            </div>
            <div>
              <p className="font-semibold text-sm">관리자</p>
              <p className="text-xs text-gray-400">admin@nfreeshop.kr</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors group text-sm font-medium">
              <Icon size={18} className="text-gray-400 group-hover:text-white" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Link href="/coupons" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-gray-400 hover:text-white text-sm">
            <LogOut size={16} />사용자 화면으로
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center gap-2 text-sm text-gray-400">
          <Shield size={14} className="text-[#D4AF37]" />
          <span>Admin</span>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-medium">관리 센터</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
