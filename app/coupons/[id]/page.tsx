"use client";
import { useParams } from "next/navigation";
import { MOCK_COUPONS, MOCK_MERCHANTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { ArrowLeft, MapPin, Clock, CheckCircle, Phone, Globe, Share2, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BarcodeDisplay from "@/components/BarcodeDisplay";

const TYPE_LABEL = (type: string, val: number) =>
  type === "PERCENT" ? `${val}% OFF` : type === "FIXED" ? `₩${val.toLocaleString()} Off` : "Free Gift";

const REDEEM_STEPS: Record<string, { icon: string; title: string; steps: string[] }> = {
  SCREEN: {
    icon: "📱", title: "화면 제시형",
    steps: ["아래 할인 화면을 직원에게 보여주세요", "직원이 확인 후 즉시 할인 적용", "별도 앱 설치 불필요"],
  },
  BARCODE: {
    icon: "〓", title: "바코드 스캔",
    steps: ["아래 바코드를 계산대 스캐너에 제시", "직원이 바코드를 스캔하면 자동 적용", "POS 연동으로 오류 없는 처리"],
  },
  QR_REVERSE: {
    icon: "⊡", title: "QR 역방향 스캔",
    steps: ["매장 내 N FREE SHOP QR 코드를 찾으세요", "카메라 앱 또는 스캔 탭으로 QR 촬영", "쿠폰이 즉시 활성화되어 화면에 표시"],
  },
};

export default function CouponDetailPage() {
  const { id } = useParams<{ id: string }>();
  const coupon = MOCK_COUPONS.find((c) => c.id === id);
  const merchant = coupon ? MOCK_MERCHANTS.find((m) => m.id === coupon.merchantId) : null;
  const category = merchant?.categoryId ? MOCK_CATEGORIES.find((c) => c.id === merchant.categoryId) : null;

  if (!coupon || !merchant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-400 text-lg">쿠폰을 찾을 수 없습니다.</p>
        <Link href="/coupons" className="bg-[#0B1A30] text-white px-6 py-2.5 rounded-xl text-sm">Back to Coupons</Link>
      </div>
    );
  }

  const discountLabel = TYPE_LABEL(coupon.couponType, coupon.discountValue);
  const endsAt = new Date(coupon.endsAt).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
  const redeemInfo = REDEEM_STEPS[coupon.redeemMode];

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      {/* Top nav */}
      <header className="bg-[#0B1A30] text-white sticky top-0 z-40 h-14 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-4">
          <Link href="/coupons" className="flex items-center gap-2 text-gray-300 hover:text-white text-sm">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">쿠폰 목록으로</span>
          </Link>
          <span className="text-gray-500">|</span>
          <span className="text-sm text-gray-300 truncate">{merchant.nameEn ?? merchant.nameKo}</span>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg"><Share2 size={16} /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg"><Heart size={16} /></button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT: Merchant Info ─────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Hero image */}
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
              <Image src={coupon.thumbnailUrl ?? "https://picsum.photos/800/400"} alt={merchant.nameEn ?? merchant.nameKo} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="bg-[#D4AF37] text-white text-sm font-black px-3 py-1.5 rounded-full shadow-lg">{discountLabel}</span>
              </div>
            </div>

            {/* Merchant profile card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden">
                  {category ? <span>{category.icon}</span> : <span>🏪</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-black text-gray-900">{merchant.nameKo}</h1>
                    {category && <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{category.nameEn}</span>}
                  </div>
                  <p className="text-gray-500 text-sm mt-0.5">{merchant.nameEn}</p>
                  <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
                    <MapPin size={14} className="flex-shrink-0" />
                    <span>{merchant.addressKo}</span>
                  </div>
                  {merchant.addressEn && (
                    <p className="text-gray-400 text-xs mt-0.5 ml-5">{merchant.addressEn}</p>
                  )}
                </div>
              </div>

              {merchant.description && (
                <p className="mt-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {merchant.description}
                </p>
              )}

              <div className="flex gap-2 mt-4">
                {(merchant as { phone?: string }).phone && (
                  <a href={`tel:${(merchant as { phone?: string }).phone}`} className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-2 rounded-lg transition-colors">
                    <Phone size={14} />전화
                  </a>
                )}
                <a href={`/map?id=${merchant.id}`} className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-2 rounded-lg transition-colors">
                  <MapPin size={14} />지도 보기
                </a>
                {(merchant as { websiteUrl?: string }).websiteUrl && (
                  <a href={(merchant as { websiteUrl?: string }).websiteUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-2 rounded-lg transition-colors">
                    <Globe size={14} />웹사이트
                  </a>
                )}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-blue-700 font-semibold text-sm">{merchant.nameKo}</p>
                  <p className="text-blue-500 text-xs mt-0.5">{merchant.addressKo}</p>
                </div>
                <Link href="/map" className="absolute bottom-3 right-3 bg-white text-[#0B1A30] text-xs font-semibold px-3 py-1.5 rounded-lg shadow hover:shadow-md transition-shadow">
                  지도에서 보기 →
                </Link>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm mb-3">🌏 다국어 쿠폰 정보</h3>
              <div className="space-y-2">
                {[
                  { flag: "🇰🇷", lang: "한국어", title: coupon.titleKo },
                  { flag: "🇺🇸", lang: "English", title: coupon.titleEn },
                  { flag: "🇯🇵", lang: "日本語", title: coupon.titleJa },
                  { flag: "🇨🇳", lang: "中文", title: coupon.titleZh },
                ].filter((l) => l.title).map((l) => (
                  <div key={l.lang} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">{l.flag}</span>
                    <span className="text-gray-400 w-16 text-xs">{l.lang}</span>
                    <span className="text-gray-700">{l.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Coupon Redemption ────────────────── */}
          <div className="space-y-4">
            {/* Coupon info */}
            <div className="bg-[#0B1A30] text-white rounded-2xl p-5 shadow-lg">
              <div className="text-4xl font-black text-[#D4AF37] mb-1">{discountLabel}</div>
              <h2 className="font-bold text-lg leading-snug">{coupon.titleKo}</h2>
              {coupon.titleEn && <p className="text-gray-400 text-sm mt-0.5">{coupon.titleEn}</p>}
              {coupon.descKo && <p className="text-gray-300 text-sm mt-3 border-t border-white/10 pt-3">{coupon.descKo}</p>}
              <div className="flex items-center gap-1 mt-3 text-gray-400 text-xs">
                <Clock size={12} />
                <span>유효기간 ~ {endsAt}</span>
              </div>
            </div>

            {/* How to use */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3">
                {redeemInfo.icon} {redeemInfo.title} 사용법
              </h3>
              <div className="space-y-2 mb-4">
                {redeemInfo.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    {step}
                  </div>
                ))}
              </div>

              {/* Redemption UI */}
              {coupon.redeemMode === "SCREEN" && (
                <div className="bg-[#0B1A30] rounded-xl p-5 text-center text-white">
                  <div className="text-5xl font-black text-[#D4AF37] mb-2">{discountLabel}</div>
                  <div className="text-sm opacity-80">{coupon.titleKo}</div>
                  <div className="mt-3 border-t border-white/20 pt-3 text-xs text-gray-400">
                    이 화면을 직원에게 제시 · Show this to staff
                  </div>
                </div>
              )}
              {coupon.redeemMode === "BARCODE" && (
                <BarcodeDisplay value={coupon.barcodeValue ?? coupon.id} label={discountLabel} />
              )}
              {coupon.redeemMode === "QR_REVERSE" && (
                <div>
                  <div className="bg-amber-50 rounded-xl p-3 text-xs text-amber-800 mb-3 text-center">
                    매장의 QR 코드를 스캔하세요<br />
                    <span className="text-amber-600">Scan merchant QR → coupon activates!</span>
                  </div>
                  <Link href="/scan" className="block w-full bg-[#0B1A30] text-white text-center font-bold py-3 rounded-xl hover:bg-[#1a2f4f] transition-colors text-sm">
                    📷 QR 스캔 시작하기
                  </Link>
                </div>
              )}
            </div>

            {/* Save button */}
            <button className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-2xl text-base hover:bg-yellow-400 transition-colors shadow-md">
              🎫 쿠폰 저장 · Save Coupon
            </button>

            {/* Notice */}
            <div className="bg-gray-100 rounded-xl p-4 text-xs text-gray-500 space-y-1">
              <p>• 1인 1회 사용 가능 · One-time use per person</p>
              <p>• 타 할인과 중복 적용 불가</p>
              <p>• 유효기간 내 사용 필수</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
