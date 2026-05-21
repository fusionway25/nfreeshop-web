"use client";
import { MapPin, Phone, Globe, Camera, Save } from "lucide-react";
import { MOCK_MERCHANTS, MOCK_CATEGORIES } from "@/lib/mock-data";

const merchant = MOCK_MERCHANTS[0];

export default function MerchantProfilePage() {
  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">매장 프로필</h1>
        <p className="text-gray-500 text-sm mt-1">N FREE SHOP에 노출되는 매장 정보를 관리합니다.</p>
      </div>

      {/* 썸네일 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">대표 이미지</h2>
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
            <img src={merchant.thumbnailUrl ?? ""} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              <Camera size={20} className="text-white" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">권장 크기: 800×600px, JPG/PNG</p>
            <button className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              이미지 변경
            </button>
          </div>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900">기본 정보</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">매장명 (한국어) *</label>
            <input defaultValue={merchant.nameKo} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">매장명 (English)</label>
            <input defaultValue={merchant.nameEn ?? ""} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">카테고리</label>
          <select defaultValue={merchant.categoryId ?? ""} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]">
            {MOCK_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.nameKo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">매장 소개</label>
          <textarea defaultValue={merchant.description ?? ""} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30] resize-none" />
        </div>
      </div>

      {/* 위치 정보 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><MapPin size={16} />위치 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">주소 (한국어) *</label>
            <input defaultValue={merchant.addressKo} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">주소 (English)</label>
            <input defaultValue={merchant.addressEn ?? ""} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">위도 (Latitude)</label>
            <input defaultValue={merchant.lat} type="number" step="0.0001" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">경도 (Longitude)</label>
            <input defaultValue={merchant.lng} type="number" step="0.0001" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
          💡 네이버 지도에서 매장을 검색한 후 URL의 좌표를 복사해 입력하세요.
        </div>
      </div>

      {/* 연락처 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-900 flex items-center gap-2"><Phone size={16} />연락처 / 링크</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">전화번호</label>
            <input placeholder="032-123-4567" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1"><Globe size={12} />웹사이트 URL</label>
            <input placeholder="https://..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1A30]/20 focus:border-[#0B1A30]" />
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-[#0B1A30] text-white font-bold py-4 rounded-2xl hover:bg-[#1a2f4f] transition-colors shadow-md">
        <Save size={16} />변경사항 저장
      </button>
    </div>
  );
}
