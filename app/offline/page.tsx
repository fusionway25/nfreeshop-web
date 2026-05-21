import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#0B1A30] flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="text-6xl mb-6">📵</div>
      <h1 className="text-2xl font-black mb-2">오프라인 상태입니다</h1>
      <p className="text-gray-400 text-sm mb-2">You&apos;re offline · オフライン · 离线状态</p>
      <p className="text-gray-300 text-sm max-w-xs mb-8">
        저장된 쿠폰은 오프라인에서도 확인 가능합니다.<br />
        Saved coupons are available offline.
      </p>
      <Link href="/my" className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-xl">
        저장된 쿠폰 보기
      </Link>
    </div>
  );
}
