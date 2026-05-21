import MerchantChart from "@/components/MerchantChart";
import { TrendingUp, Download, CheckCircle, Eye } from "lucide-react";

const MONTHLY = [
  { month: "1월", downloads: 520, redeems: 162 },
  { month: "2월", downloads: 610, redeems: 190 },
  { month: "3월", downloads: 780, redeems: 243 },
  { month: "4월", downloads: 920, redeems: 287 },
  { month: "5월", downloads: 1248, redeems: 389 },
];

const TOP_COUPONS = [
  { title: "아메리카노 2+1", downloads: 312, redeems: 98, rate: "31.4%" },
  { title: "음료 세트 ₩3,000 OFF", downloads: 156, redeems: 45, rate: "28.8%" },
  { title: "케이크 20% 할인", downloads: 0, redeems: 0, rate: "-" },
];

export default function MerchantStatsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">통계</h1>
        <p className="text-gray-500 text-sm mt-1">쿠폰 성과 및 방문자 데이터를 확인합니다.</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "누적 다운로드", val: "4,078", icon: Download, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "누적 리딤", val: "1,271", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: "평균 리딤율", val: "31.2%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "누적 조회수", val: "18,420", icon: Eye, color: "text-purple-600", bg: "bg-purple-50" },
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

      {/* Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">최근 7일 다운로드 추이</h2>
        <MerchantChart />
      </div>

      {/* Monthly table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">월별 현황</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">월</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">다운로드</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">리딤</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">리딤율</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MONTHLY.map((m) => (
              <tr key={m.month} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{m.month}</td>
                <td className="px-4 py-3 text-right text-gray-700">{m.downloads.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-green-600 font-medium">{m.redeems.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-gray-500">{((m.redeems / m.downloads) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top coupons */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">쿠폰별 성과</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">쿠폰명</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">다운로드</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">리딤</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">리딤율</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {TOP_COUPONS.map((c) => (
              <tr key={c.title} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-900">{c.title}</td>
                <td className="px-4 py-3 text-right text-gray-700">{c.downloads}</td>
                <td className="px-4 py-3 text-right text-green-600 font-medium">{c.redeems}</td>
                <td className="px-4 py-3 text-right font-bold text-[#D4AF37]">{c.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
