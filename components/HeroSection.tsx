"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Users, PackageCheck } from "lucide-react";
import { GAMES, LIVE_TICKER, STATS } from "@/lib/mockData";

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let frame: number;
    function step(ts: number) {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / durationMs, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);
  return value;
}

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function HeroSection() {
  const orders = useCountUp(STATS.totalOrders);
  const customers = useCountUp(STATS.totalCustomers);
  const sold = useCountUp(STATS.totalAccountsSold);

  return (
    <section className="relative overflow-hidden rounded-3xl glass-panel border border-white/10 p-6 md:p-10 mt-4">
      <div className="absolute inset-0 bg-grid-fade bg-[size:32px_32px] opacity-30 pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold leading-tight"
          >
            Chợ Tài Khoản Game{" "}
            <span className="text-neonCyan animate-glow rounded">Siêu VIP</span>
          </motion.h1>
          <p className="text-white/60 mt-3 max-w-lg text-sm md:text-base">
            Genshin Impact · Free Fire · Liên Quân · Valorant — giao dịch tự động,
            thông tin xác minh 100%, bảo hành đổi trả.
          </p>

          <div className="flex gap-2 mt-4 flex-wrap">
            {GAMES.map((g) => (
              <span
                key={g.slug}
                className="text-[11px] rounded-full px-3 py-1 border border-white/10 text-white/70"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 max-w-md">
            <StatBlock icon={ShoppingBag} label="Giao dịch" value={orders.toLocaleString("vi-VN")} />
            <StatBlock icon={Users} label="Khách hàng" value={customers.toLocaleString("vi-VN")} />
            <StatBlock icon={PackageCheck} label="Acc đã bán" value={sold.toLocaleString("vi-VN")} />
          </div>
        </div>

        {/* Live ticker */}
        <div className="w-full md:w-72 shrink-0">
          <div className="glass-panel rounded-2xl border border-white/10 p-3">
            <p className="text-[11px] text-white/50 mb-2">Hoạt động trực tiếp</p>
            <ul className="space-y-2 max-h-40 overflow-hidden">
              {LIVE_TICKER.map((t) => (
                <motion.li
                  key={t.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs flex justify-between border-b border-white/5 pb-1.5"
                >
                  <span className="text-white/70">
                    {t.maskedUser} vừa {t.action === "purchase" ? "mua acc" : "nạp tiền"}
                  </span>
                  <span className="text-gold shrink-0 ml-2">{formatVND(t.amount)}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShoppingBag;
  label: string;
  value: string;
}) {
  return (
    <div className="animate-countUp">
      <Icon className="w-4 h-4 text-neonCyan mb-1" />
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="text-[10px] text-white/50">{label}</p>
    </div>
  );
}
