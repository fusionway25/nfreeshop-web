"use client";
import { useEffect, useState } from "react";

export default function PWARegister() {
  const [showInstall, setShowInstall] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(console.error);
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 bg-[#0B1A30] text-white rounded-2xl p-4 shadow-2xl z-50 flex items-center gap-3">
      <div className="text-3xl">📲</div>
      <div className="flex-1">
        <p className="font-bold text-sm">앱으로 설치하기</p>
        <p className="text-xs text-gray-300 mt-0.5">홈 화면에 추가하면 더 빠르게!</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <button onClick={install} className="bg-[#D4AF37] text-black text-xs font-bold px-3 py-1.5 rounded-lg">설치</button>
        <button onClick={() => setShowInstall(false)} className="text-gray-400 text-xs">나중에</button>
      </div>
    </div>
  );
}
