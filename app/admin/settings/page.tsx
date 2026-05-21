import { Shield, Bell, Globe, Database, Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-xl space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">시스템 설정</h1>
        <p className="text-gray-500 text-sm mt-1">플랫폼 전반적인 설정을 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Globe size={16} />기본 설정</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">플랫폼 기본 언어</label>
          <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none">
            <option>English</option>
            <option>한국어</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">쿠폰 최대 유효기간 (일)</label>
          <input type="number" defaultValue={365} className="w-32 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Bell size={16} />관리자 알림</h2>
        {[
          { label: "신규 가맹점 신청 시", defaultChecked: true },
          { label: "쿠폰 등록 요청 시", defaultChecked: true },
          { label: "일일 통계 리포트", defaultChecked: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{item.label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B1A30]" />
            </label>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Shield size={16} />보안</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">가맹점 자동 승인</p>
            <p className="text-xs text-gray-400">OFF 권장 — 수동 검토 후 승인</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B1A30]" />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-3"><Database size={16} />데이터베이스</h2>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-green-50 rounded-xl p-3">
            <p className="text-green-600 font-black text-lg">✓</p>
            <p className="text-xs text-green-700 font-medium">Neon Postgres</p>
            <p className="text-[10px] text-green-500">연결됨</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-gray-600 font-black text-lg">⚡</p>
            <p className="text-xs text-gray-700 font-medium">응답속도</p>
            <p className="text-[10px] text-gray-500">12ms avg</p>
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-[#0B1A30] text-white font-bold py-4 rounded-2xl hover:bg-[#1a2f4f] transition-colors shadow-md">
        <Save size={16} />설정 저장
      </button>
    </div>
  );
}
