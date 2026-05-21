import AdminChart from "@/components/AdminChart";
import { Users, Download, CheckCircle, TrendingUp, Globe } from "lucide-react";

const COUNTRY_STATS = [
  { flag: "🇯🇵", country: "일본", users: 5840, pct: "31.7%" },
  { flag: "🇨🇳", country: "중국", users: 4920, pct: "26.7%" },
  { flag: "🇺🇸", country: "미국", users: 2380, pct: "12.9%" },
  { flag: "🇹🇼", country: "대만", users: 1870, pct: "10.2%" },
  { flag: "🇸🇬", country: "싱가포르", users: 980, pct: "5.3%" },
  { flag: "🇰🇷", country: "한국", users: 2450, pct: "13.3%" },
];

export default function AdminStatsPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-gray-900">전체 통계</h1>
        <p className="text-gray-500 text-sm mt-1">플랫폼 전체 사용 현황을 확인합니다.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "누적 방문자", val: "18,420", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "누적 다운로드", val: "42,180", icon: Download, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "누적 리딤", val: "13,156", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "평균 리딤율", val: "31.2%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div className="text-2xl font-black text-gray-900">{s.val}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">플랫폼 사용 추이 (최근 30일)</h2>
        <AdminChart />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Globe size={16} />국가별 방문자</h2>
        <div className="space-y-3">
          {COUNTRY_STATS.map((c) => (
            <div key={c.country} className="flex items-center gap-3">
              <span className="text-xl w-7">{c.flag}</span>
              <span className="text-sm font-medium text-gray-700 w-16">{c.country}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0B1A30] rounded-full" style={{ width: c.pct }} />
              </div>
              <span className="text-sm font-bold text-gray-900 w-12 text-right">{c.pct}</span>
              <span className="text-xs text-gray-400 w-14 text-right">{c.users.toLocaleString()}명</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
