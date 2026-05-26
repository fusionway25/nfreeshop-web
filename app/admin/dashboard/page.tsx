import AdminChart from "@/components/AdminChart";
import { Store, Ticket, TrendingUp, CheckCircle, Clock, XCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

const KPIS = [
  { label: "Total Merchants", val: "127", sub: "94 Approved", icon: Store, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Coupons", val: "348", sub: "+42 This Month", icon: Ticket, color: "text-[#D4AF37]", bg: "bg-yellow-50" },
  { label: "Total Users", val: "18,420", sub: "72% Foreign Tourists", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Redeems (This Month)", val: "9,182", sub: "+31% vs Last Month", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
];

const PENDING_MERCHANTS = [
  { name: "Songdo K-Food Restaurant", category: "Food & Cafe", applied: "2026.05.20", contact: "010-1234-5678" },
  { name: "Incheon Port Souvenir Shop", category: "Shopping", applied: "2026.05.21", contact: "032-456-7890" },
  { name: "Yeongjongdo Haenyeo Experience", category: "Tour & Activity", applied: "2026.05.21", contact: "010-9876-5432" },
];

const PENDING_COUPONS = [
  { merchant: "Cafe 1883 Incheon", title: "Cake 20% OFF", type: "PERCENT", applied: "2026.05.21" },
  { merchant: "Songdo Shinsegae Duty Free", title: "Beauty Set ₩20,000 OFF", type: "FIXED", applied: "2026.05.20" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">N FREE SHOP Platform Overview · May 21, 2026</p>
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
            <h2 className="font-bold text-gray-900">Platform Usage (Last 30 Days)</h2>
          </div>
          <AdminChart />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Pending Approvals</h2>
          <div className="space-y-3">
            {[
              { label: "New Merchant Applications", count: 3, color: "bg-blue-500", href: "/admin/merchants" },
              { label: "Coupon Registration Requests", count: 2, color: "bg-yellow-500", href: "/admin/coupons" },
              { label: "Info Update Requests", count: 1, color: "bg-purple-500", href: "/admin/merchants" },
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
              <div className="text-gray-400">Approved</div>
            </div>
            <div>
              <div className="font-black text-yellow-600 text-lg">6</div>
              <div className="text-gray-400">Pending</div>
            </div>
            <div>
              <div className="font-black text-red-500 text-lg">2</div>
              <div className="text-gray-400">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pending merchants */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">New Merchant Applications</h2>
            <Link href="/admin/merchants" className="text-xs text-[#0B1A30] font-medium">View All</Link>
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
                    <CheckCircle size={11} />Approve
                  </button>
                  <button className="flex items-center gap-1 bg-red-50 text-red-500 text-xs font-semibold px-2 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                    <XCircle size={11} />Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending coupons */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Coupon Registration Requests</h2>
            <Link href="/admin/coupons" className="text-xs text-[#0B1A30] font-medium">View All</Link>
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
                  <Clock size={9} className="inline mr-0.5" />Pending
                </span>
                <div className="flex gap-1">
                  <button className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-green-200">Approve</button>
                  <button className="bg-red-50 text-red-500 text-xs font-semibold px-2 py-1.5 rounded-lg hover:bg-red-100">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
