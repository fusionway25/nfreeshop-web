import MerchantChart from "@/components/MerchantChart";
import { TrendingUp, Eye, ChevronRight, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Coupon Downloads (This Month)", val: "1,248", change: "+18%", icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Actual Redeems", val: "389", change: "+12%", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { label: "Page Views", val: "4,720", change: "+25%", icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Redemption Rate", val: "31.2%", change: "+3.1%p", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
];

const RECENT_COUPONS = [
  { title: "아메리카노 2+1", type: "GIFT", status: "APPROVED", downloads: 312, redeems: 98 },
  { title: "케이크 20% 할인", type: "PERCENT", status: "PENDING", downloads: 0, redeems: 0 },
  { title: "음료 세트 ₩3,000 OFF", type: "FIXED", status: "APPROVED", downloads: 156, redeems: 45 },
];

const STATUS_BADGE: Record<string, string> = {
  APPROVED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  REJECTED: "bg-red-100 text-red-700",
};
const STATUS_LABEL: Record<string, string> = { APPROVED: "Approved", PENDING: "Pending", REJECTED: "Rejected" };

export default function MerchantDashboard() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Cafe 1883 Incheon · May 2026</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div className="text-2xl font-black text-gray-900">{s.val}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            <div className="text-xs text-green-600 font-medium mt-1">{s.change} vs Last Month</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Coupon Downloads (Last 7 Days)</h2>
            <span className="text-xs text-gray-400">Downloads / Redeems</span>
          </div>
          <MerchantChart />
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/merchant/coupons/new" className="flex items-center justify-between p-3 bg-[#0B1A30] text-white rounded-xl text-sm font-medium hover:bg-[#1a2f4f] transition-colors">
                <span>+ Register New Coupon</span>
                <ChevronRight size={14} />
              </Link>
              <Link href="/merchant/profile" className="flex items-center justify-between p-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                <span>Edit Store Info</span>
                <ChevronRight size={14} />
              </Link>
              <Link href="/merchant/stats" className="flex items-center justify-between p-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
                <span>View Detailed Stats</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-800">1 Pending Review</span>
            </div>
            <p className="text-xs text-amber-700">Cake 20% OFF coupon is awaiting admin approval.</p>
          </div>
        </div>
      </div>

      {/* Coupon table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Coupons</h2>
          <Link href="/merchant/coupons" className="text-sm text-[#0B1A30] font-medium flex items-center gap-1">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="divide-y divide-gray-100">
          {RECENT_COUPONS.map((c) => (
            <div key={c.title} className="flex items-center gap-4 px-5 py-3.5">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{c.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{c.type}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[c.status]}`}>
                {STATUS_LABEL[c.status]}
              </span>
              <div className="text-right text-sm">
                <p className="font-bold text-gray-900">{c.downloads}</p>
                <p className="text-xs text-gray-400">Downloads</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-bold text-green-600">{c.redeems}</p>
                <p className="text-xs text-gray-400">Redeems</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
