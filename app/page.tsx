"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MOCK_MERCHANTS, MOCK_COUPONS } from "@/lib/mock-data";
import {
  MapPin, Ticket, QrCode, Search, ChevronLeft, ChevronRight,
  Store, ArrowRight, Globe, Pause, Play,
} from "lucide-react";

/* ── 슬라이드 ─────────────────────────────────── */
const SLIDES = [
  {
    img: "https://picsum.photos/seed/incheon-night/1920/640",
    badge: "🎯  이번 주 인기",
    title: "인천 최대\n외국인 쿠폰 플랫폼",
    sub: "방한 관광객을 위한 무료 쿠폰 · NICE 가맹점 네트워크 · 5개 언어 지원",
    cta1: { label: "쿠폰 둘러보기", href: "/coupons" },
    cta2: { label: "지도로 찾기", href: "/map" },
    accent: "#D4AF37",
  },
  {
    img: "https://picsum.photos/seed/korea-shopping/1920/640",
    badge: "📍  앱 설치 불필요",
    title: "QR 하나로\n즉시 발급 · 즉시 사용",
    sub: "스캔 한 번 → 쿠폰 발급 → 오프라인 결제 완결 · iOS · Android 동시 지원",
    cta1: { label: "QR 스캔하기", href: "/scan" },
    cta2: { label: "사용법 보기", href: "/coupons" },
    accent: "#60a5fa",
  },
  {
    img: "https://picsum.photos/seed/merchant-store/1920/640",
    badge: "🤝  가맹점 모집 중",
    title: "NICE 가맹점\n지금 합류하세요",
    sub: "전국 74만 NICE 가맹점 · 쿠폰 CMS 무상 제공 · 외국인 모객 효과 즉시",
    cta1: { label: "가맹점 신청", href: "/merchant/dashboard" },
    cta2: { label: "어드민 보기", href: "/admin/dashboard" },
    accent: "#4ade80",
  },
];

const CATEGORIES = [
  { icon: "🛍️", ko: "쇼핑", en: "Shopping" },
  { icon: "🍜", ko: "맛집·카페", en: "Food & Cafe" },
  { icon: "💆", ko: "뷰티·스파", en: "Beauty & Spa" },
  { icon: "🗺️", ko: "관광·체험", en: "Tour & Activity" },
  { icon: "🏨", ko: "숙박", en: "Stay" },
  { icon: "✈️", ko: "교통", en: "Transport" },
  { icon: "🎁", ko: "특산품", en: "Gifts" },
];

const LANG_OPTIONS = ["한국어", "English", "日本語", "中文简体", "Tiếng Việt"];

const DISCOUNT_COLORS: Record<string, string> = {
  PERCENT: "bg-rose-500",
  FIXED: "bg-indigo-600",
  GIFT: "bg-emerald-600",
};

const CAT_ICONS: Record<string, string> = {
  "cat-1": "🍜", "cat-2": "🛍️", "cat-3": "🗺️", "cat-4": "💆", "cat-5": "🏨",
};

function discountLabel(type: string, value: number) {
  if (type === "PERCENT") return `${value}% OFF`;
  if (type === "FIXED") return `₩${value.toLocaleString()} OFF`;
  return "FREE";
}

/* ══════════════════════════════════════════════ */
export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(1);

  const next = useCallback(() => setSlide((s) => (s + 1) % SLIDES.length), []);
  const prev = useCallback(() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  const merchantMap = Object.fromEntries(MOCK_MERCHANTS.map((m) => [m.id, m]));

  return (
    <div className="min-h-screen bg-white">

      {/* ── 고정 헤더 (glassmorphism) ──────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 h-[72px] bg-white/85 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
        <div className="max-w-[1440px] mx-auto h-full px-8 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#0B1A30] rounded-lg flex items-center justify-center">
              <Ticket size={16} className="text-[#D4AF37]" />
            </div>
            <span className="font-black text-[#0B1A30] text-lg leading-none tracking-tight">
              N FREE<span className="text-[#D4AF37]"> SHOP</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: "쿠폰", href: "/coupons" },
              { label: "지도", href: "/map" },
              { label: "QR 스캔", href: "/scan" },
              { label: "가맹점 CMS", href: "/merchant/dashboard" },
              { label: "어드민", href: "/admin/dashboard" },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="text-[15px] font-medium text-gray-700 hover:text-[#0B1A30] transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/coupons"
              className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
              <Search size={16} className="text-white" />
            </Link>
            <div className="relative">
              <button onClick={() => setLangOpen((v) => !v)}
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[#D4AF37] transition-colors">
                <Globe size={16} className="text-white" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-12 bg-gray-900 rounded-2xl shadow-2xl p-3 flex gap-2 whitespace-nowrap z-50">
                  {LANG_OPTIONS.map((lang, i) => (
                    <button key={lang} onClick={() => { setActiveLang(i); setLangOpen(false); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        activeLang === i ? "bg-[#D4AF37] text-[#0B1A30]" : "text-gray-300 hover:text-white"
                      }`}>
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="pt-[72px]">

        {/* ── KV 슬라이더 ─────────────────────────────── */}
        <section className="relative h-[600px] overflow-hidden bg-[#0B1A30]">
          {SLIDES.map((s, i) => (
            <div key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}>
              <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A30]/92 via-[#0B1A30]/65 to-transparent" />
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

              <div className="relative h-full max-w-[1440px] mx-auto px-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 text-sm font-bold px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-white w-fit mb-5">
                  {s.badge}
                </span>
                <h1 className="text-5xl lg:text-[4rem] font-black text-white leading-[1.1] mb-5 whitespace-pre-line drop-shadow-2xl">
                  {s.title}
                </h1>
                <p className="text-base text-white/70 mb-8 max-w-lg leading-relaxed">{s.sub}</p>
                <div className="flex gap-3">
                  <Link href={s.cta1.href}
                    className="px-7 py-3.5 rounded-xl font-black text-[#0B1A30] text-sm hover:scale-105 transition-all shadow-xl"
                    style={{ background: s.accent }}>
                    {s.cta1.label}
                  </Link>
                  <Link href={s.cta2.href}
                    className="px-7 py-3.5 rounded-xl font-bold text-white text-sm bg-white/10 backdrop-blur border border-white/25 hover:bg-white/20 transition-all">
                    {s.cta2.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <button onClick={prev}
              className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setPaused((v) => !v)}
              className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              {paused ? <Play size={13} /> : <Pause size={13} />}
            </button>
            <button onClick={next}
              className="w-8 h-8 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="absolute bottom-7 right-10 text-sm font-bold text-white/50">
            <span className="text-white text-base">{slide + 1}</span>&nbsp;/&nbsp;{SLIDES.length}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
            <div className="h-full bg-[#D4AF37] transition-all duration-500 ease-linear"
              style={{ width: `${((slide + 1) / SLIDES.length) * 100}%` }} />
          </div>
        </section>

        {/* ── 카테고리 퀵 링크 ─────────────────────────── */}
        <section className="bg-white border-b border-gray-100 py-7">
          <div className="max-w-4xl mx-auto px-6 flex justify-around items-start">
            {CATEGORIES.map((cat) => (
              <Link key={cat.ko} href="/coupons"
                className="flex flex-col items-center gap-2 group min-w-[68px]">
                <div className="w-[60px] h-[60px] bg-gray-50 rounded-2xl flex items-center justify-center text-2xl
                  group-hover:bg-[#0B1A30]/8 group-hover:scale-105 transition-all duration-200 shadow-sm border border-gray-100">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-semibold text-gray-600 group-hover:text-[#0B1A30] text-center transition-colors leading-tight">
                  {cat.ko}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 이번 주 인기 쿠폰 ────────────────────────── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-black text-[#D4AF37] uppercase tracking-widest mb-1.5">Hot Coupons</p>
                <h2 className="text-3xl font-black text-[#0B1A30]">이번 주 인기 쿠폰</h2>
              </div>
              <Link href="/coupons"
                className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-[#0B1A30] transition-colors group">
                전체보기 <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="flex gap-2 mb-7">
              {["전체", "맛집", "쇼핑", "뷰티", "관광"].map((f, i) => (
                <button key={f}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                    i === 0 ? "bg-[#0B1A30] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {f}
                </button>
              ))}
            </div>

            <div className="flex gap-5 overflow-x-auto pb-3 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
              {MOCK_COUPONS.map((c) => {
                const m = merchantMap[c.merchantId];
                return (
                  <Link key={c.id} href={`/coupons/${c.id}`}
                    className="flex-shrink-0 w-[255px] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group bg-white shadow-sm">
                    <div className="relative h-[165px] overflow-hidden bg-gray-100">
                      <img src={c.thumbnailUrl ?? m?.thumbnailUrl ?? ""}
                        alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className={`absolute top-3 left-3 text-[11px] font-black text-white px-2.5 py-1 rounded-lg shadow ${DISCOUNT_COLORS[c.couponType]}`}>
                        {discountLabel(c.couponType, c.discountValue)}
                      </span>
                    </div>
                    <div className="p-4 bg-[#f7f8fa]">
                      <p className="text-[10px] font-black text-[#D4AF37] mb-1 uppercase tracking-wide">{m?.nameEn ?? ""}</p>
                      <p className="text-sm font-bold text-[#0B1A30] leading-tight line-clamp-2">{c.titleKo}</p>
                      <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                        <MapPin size={9} className="flex-shrink-0" />
                        {m?.addressKo?.split(" ").slice(0, 3).join(" ")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 추천 가맹점 (4-col grid) ─────────────────── */}
        <section className="py-14 bg-[#f8f9fa]">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-black text-[#D4AF37] uppercase tracking-widest mb-1.5">Featured Merchants</p>
                <h2 className="text-3xl font-black text-[#0B1A30]">추천 가맹점</h2>
              </div>
              <Link href="/map"
                className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-[#0B1A30] transition-colors group">
                지도에서 보기 <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {MOCK_MERCHANTS.map((m) => {
                const couponCount = MOCK_COUPONS.filter((c) => c.merchantId === m.id).length;
                return (
                  <Link key={m.id} href={`/coupons?merchant=${m.id}`}
                    className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 group shadow-sm">
                    <div className="relative h-[200px] overflow-hidden bg-gray-100">
                      <img src={m.thumbnailUrl ?? ""}
                        alt={m.nameKo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[11px] font-bold text-[#0B1A30] shadow-sm">
                        {CAT_ICONS[m.categoryId] ?? "🏪"}
                      </div>
                      {couponCount > 0 && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-[#0B1A30]/90 backdrop-blur text-[#D4AF37] text-[11px] font-black px-2.5 py-1 rounded-xl">
                          <Ticket size={10} /> {couponCount}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-[#0B1A30] text-sm truncate group-hover:text-[#D4AF37] transition-colors">
                        {m.nameKo}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{m.nameEn}</p>
                      <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-2">
                        <MapPin size={9} className="flex-shrink-0" />
                        {m.addressKo?.split(" ").slice(0, 3).join(" ")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 지도 CTA 배너 ─────────────────────────────── */}
        <section className="py-14 bg-white">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="rounded-3xl overflow-hidden relative h-[260px]"
              style={{ backgroundImage: "url(https://picsum.photos/seed/city-aerial/1440/260)", backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A30]/95 via-[#0B1A30]/75 to-[#0B1A30]/30" />
              <div className="relative h-full flex flex-col justify-center px-12">
                <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-3">📍 Map</p>
                <h3 className="text-4xl font-black text-white mb-5 leading-tight">
                  내 주변 가맹점<br />지금 찾아보기
                </h3>
                <Link href="/map"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0B1A30] font-black text-sm rounded-xl hover:scale-105 transition-transform w-fit shadow-xl">
                  <MapPin size={14} /> 지도 열기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── KPI 통계 ─────────────────────────────────── */}
        <section className="bg-[#0B1A30] py-16">
          <div className="max-w-4xl mx-auto px-8 grid grid-cols-3 gap-8 text-center divide-x divide-white/10">
            {[
              { val: "300+", ko: "주요 가맹점", en: "Key Merchants" },
              { val: "3,000+", ko: "등록 쿠폰", en: "Active Coupons" },
              { val: "30만", ko: "MAU 목표", en: "Monthly Active Users" },
            ].map((s) => (
              <div key={s.ko} className="px-4">
                <div className="text-4xl lg:text-5xl font-black text-[#D4AF37] mb-2">{s.val}</div>
                <div className="text-sm font-bold text-white">{s.ko}</div>
                <div className="text-xs text-white/35 mt-0.5">{s.en}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PWA 배너 ─────────────────────────────────── */}
        <section className="py-14 bg-gradient-to-br from-[#f5f0fc] to-[#fce9ef]">
          <div className="max-w-2xl mx-auto px-8 text-center">
            <div className="text-5xl mb-5">📲</div>
            <h3 className="text-2xl font-black text-[#0B1A30] mb-3">홈 화면에 추가하세요</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              앱스토어 설치 없이 · 오프라인에서도 작동 · iOS · Android 동시 지원<br />
              주소창의 <strong>설치 버튼</strong>을 탭하거나 <strong>&ldquo;홈 화면에 추가&rdquo;</strong>를 선택하세요
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/coupons"
                className="px-8 py-3.5 bg-[#0B1A30] text-white font-bold text-sm rounded-xl hover:bg-[#1a2f4f] transition-colors shadow-lg">
                쿠폰 보러가기
              </Link>
              <Link href="/scan"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#0B1A30] text-[#0B1A30] font-bold text-sm rounded-xl hover:bg-[#0B1A30]/5 transition-colors">
                <QrCode size={15} /> QR 스캔
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ── 푸터 ─────────────────────────────────────── */}
      <footer className="bg-[#1a1a1a] text-white pt-14 pb-8">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <Ticket size={16} className="text-[#0B1A30]" />
                </div>
                <span className="font-black text-xl">N FREE SHOP</span>
              </div>
              <p className="text-[13px] text-gray-400 leading-relaxed">
                방한 외국인 관광객을 위한<br />무료 쿠폰 플랫폼.<br />NICE 가맹점 네트워크 연동.
              </p>
            </div>

            {[
              { title: "서비스", links: ["쿠폰 목록", "가맹점 지도", "QR 스캔", "찜 목록"] },
              { title: "파트너", links: ["가맹점 CMS", "쿠폰 등록", "통계", "설정"] },
              { title: "관리자", links: ["대시보드", "가맹점 승인", "전체 통계", "시스템 설정"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="/coupons" className="text-[13px] text-gray-400 hover:text-white transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-7 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-[12px] text-gray-500">
              © 2026 주식회사 퓨전웨이 · 워터트리 &mdash; N FREE SHOP. 운영 문의: fusionway25@gmail.com
            </div>
            <div className="flex items-center gap-3">
              {["🇰🇷 한국어", "🇺🇸 English", "🇯🇵 日本語", "🇨🇳 中文"].map((lang) => (
                <button key={lang} className="text-[11px] text-gray-500 hover:text-[#D4AF37] transition-colors">
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-gray-600">
            <Store size={11} />
            <span>NICE 정보통신 가맹점 홍보 플랫폼 &nbsp;·&nbsp; 인천관광공사 운영 레퍼런스: incheonstamptour.com · incheoncouponpass.com</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
