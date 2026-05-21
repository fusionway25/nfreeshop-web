import { Bell, Lock, Globe, LogOut } from "lucide-react";

export default function MerchantSettingsPage() {
  return (
    <div className="max-w-xl space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">설정</h1>
        <p className="text-gray-500 text-sm mt-1">계정 및 알림 설정을 관리합니다.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Bell size={16} />알림 설정</h2>
        {[
          { label: "쿠폰 승인/반려 알림", desc: "관리자가 쿠폰을 승인하거나 반려할 때", defaultChecked: true },
          { label: "리딤 알림", desc: "고객이 쿠폰을 사용할 때마다", defaultChecked: false },
          { label: "주간 통계 리포트", desc: "매주 월요일 이메일로 발송", defaultChecked: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0B1A30]" />
            </label>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Globe size={16} />언어 설정</h2>
        <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20">
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Lock size={16} />보안</h2>
        <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          비밀번호 변경
        </button>
        <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          2단계 인증 설정
        </button>
      </div>

      <button className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 font-medium py-3 rounded-2xl hover:bg-red-50 transition-colors text-sm">
        <LogOut size={14} />로그아웃
      </button>
    </div>
  );
}
