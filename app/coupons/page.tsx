import Link from "next/link";
import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import { MOCK_COUPONS, MOCK_MERCHANTS, MOCK_CATEGORIES } from "@/lib/mock-data";
import { Search, MapPin, ChevronRight } from "lucide-react";

const REDEEM_COLORS: Record<string, string> = {
  SCREEN: "bg-blue-100 text-blue-700",
  BARCODE: "bg-purple-100 text-purple-700",
  QR_REVERSE: "bg-emerald-100 text-emerald-700",
};
const REDEEM_LABELS: Record<string, string> = {
  SCREEN: "화면제시",
  BARCODE: "바코드",
  QR_REVERSE: "QR역방향",
};
const TYPE_LABEL = (type: string, val: number) =>
  type === "PERCENT" ? `${val}% OFF` : type === "FIXED" ? `₩${val.toLocaleString()} OFF` : "FREE GIFT";

export default function CouponsPage({
  searchParams,
}: {
  searchParams: { cat?: string; q?: string };
}) {
  const { cat, q } = searchParams;

  const coupons = MOCK_COUPONS.filter((c) => {
    if (cat && cat !== "all") return c.categoryId === cat;
    return true;
  }).filter((c) => {
    if (!q) return true;
    const s = q.toLowerCase();
    const m = MOCK_MERCHANTS.find((m) => m.id === c.merchantId);
    return c.titleEn?.toLowerCase().includes(s) || c.titleKo.includes(q) || m?.nameEn?.toLowerCase().includes(s);
  });

  const featured = MOCK_COUPONS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      {/* ── TOP NAV ──────────────────────────────────────── */}
      <header className="bg-[#0B1A30] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl font-black tracking-tight text-white">N FREE</span>
            <span className="text-2xl font-black text-[#D4AF37]">SHOP</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/coupons" className="text-[#D4AF37]">Coupons</Link>
            <Link href="/map" className="text-gray-300 hover:text-white">Map</Link>
            <Link href="/scan" className="text-gray-300 hover:text-white">QR Scan</Link>
            <Link href="/my" className="text-gray-300 hover:text-white">My</Link>
          </nav>
          <div className="flex items-center gap-3">
            <form className="relative hidden sm:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="q"
                defaultValue={q}
                placeholder="Search coupons..."
                className="bg-white/10 text-white placeholder-gray-400 rounded-lg pl-8 pr-3 py-1.5 text-sm w-48 focus:outline-none focus:bg-white/20 focus:w-64 transition-all"
              />
            </form>
            <Link href="/merchant/dashboard" className="hidden md:block bg-[#D4AF37] text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-yellow-400">
              가맹점 CMS
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO BANNER ─────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0B1A30] via-[#1a2f4f] to-[#0B1A30] text-white py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-4">
              🇰🇷 Korea FIT Travel Coupon Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              한국 여행,<br />
              <span className="text-[#D4AF37]">할인은 여기서</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              인천·서울 400+ 가맹점의 독점 쿠폰을 무료로.<br className="hidden md:block" />
              Exclusive coupons for restaurants, shopping & experiences.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/scan" className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-colors flex items-center gap-2">
                📱 QR 스캔으로 즉시 할인
              </Link>
              <Link href="/map" className="bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2">
                <MapPin size={16} />내 주변 가맹점 보기
              </Link>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 flex-shrink-0">
            {[
              { val: "400+", label: "가맹점", sub: "Merchants" },
              { val: "200万", label: "누적 조회", sub: "Page Views" },
              { val: "5개", label: "언어 지원", sub: "Languages" },
            ].map((s) => (
              <div key={s.val} className="bg-white/10 rounded-2xl p-4 text-center min-w-[90px]">
                <div className="text-2xl font-black text-[#D4AF37]">{s.val}</div>
                <div className="text-xs text-white font-medium mt-1">{s.label}</div>
                <div className="text-[10px] text-gray-400">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ── FEATURED ────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🔥 추천 쿠폰 Featured</h2>
            <Link href="/coupons?cat=all" className="text-sm text-[#0B1A30] flex items-center gap-1 font-medium">전체 보기 <ChevronRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((c) => {
              const m = MOCK_MERCHANTS.find((m) => m.id === c.merchantId)!;
              return (
                <Link key={c.id} href={`/coupons/${c.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={c.thumbnailUrl ?? "https://picsum.photos/400/300"} alt={c.titleEn ?? c.titleKo} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 right-3 bg-[#D4AF37] text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                      {TYPE_LABEL(c.couponType, c.discountValue)}
                    </span>
                    <span className={`absolute bottom-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full ${REDEEM_COLORS[c.redeemMode]}`}>
                      {REDEEM_LABELS[c.redeemMode]}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">{m.nameEn ?? m.nameKo}</p>
                    <h3 className="font-bold text-gray-900 leading-snug">{c.titleEn ?? c.titleKo}</h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><MapPin size={11} />{m.addressEn ?? m.addressKo}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── MAIN CONTENT: SIDEBAR + GRID ────────────── */}
        <div className="flex gap-8">
          {/* Category sidebar */}
          <aside className="hidden lg:block w-48 flex-shrink-0">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">카테고리</h3>
            <div className="space-y-1">
              {[{ id: "all", nameEn: "All Coupons", icon: "🎯" }, ...MOCK_CATEGORIES].map((c) => (
                <a
                  key={c.id}
                  href={`/coupons?cat=${c.id}`}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    (cat ?? "all") === c.id
                      ? "bg-[#0B1A30] text-white"
                      : "text-gray-600 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  <span>{c.nameEn}</span>
                </a>
              ))}
            </div>
          </aside>

          {/* Coupon grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile category scroll */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-5 lg:hidden">
              {[{ id: "all", nameEn: "All", icon: "🎯" }, ...MOCK_CATEGORIES].map((c) => (
                <a key={c.id} href={`/coupons?cat=${c.id}`}
                  className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border ${
                    (cat ?? "all") === c.id ? "bg-[#0B1A30] text-white border-[#0B1A30]" : "bg-white text-gray-600 border-gray-200"
                  }`}>
                  <span>{c.icon}</span><span>{c.nameEn}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500"><span className="font-bold text-gray-900">{coupons.length}</span>개의 쿠폰</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {coupons.map((c) => {
                const m = MOCK_MERCHANTS.find((m) => m.id === c.merchantId)!;
                return (
                  <Link key={c.id} href={`/coupons/${c.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                    <div className="relative h-36 overflow-hidden">
                      <Image src={c.thumbnailUrl ?? "https://picsum.photos/400/300"} alt={c.titleEn ?? c.titleKo} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                      <span className="absolute top-2 right-2 bg-[#D4AF37] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                        {TYPE_LABEL(c.couponType, c.discountValue)}
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] text-gray-400 mb-0.5 truncate">{m.nameEn ?? m.nameKo}</p>
                      <h3 className="font-semibold text-sm text-gray-900 leading-snug line-clamp-2">{c.titleEn ?? c.titleKo}</h3>
                      <span className={`mt-2 inline-block text-[10px] px-1.5 py-0.5 rounded-full font-medium ${REDEEM_COLORS[c.redeemMode]}`}>
                        {REDEEM_LABELS[c.redeemMode]}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
