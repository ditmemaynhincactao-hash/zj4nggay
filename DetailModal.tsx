"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Gift } from "lucide-react";
import { AccountListing } from "@/lib/types";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

interface DetailModalProps {
  account: AccountListing | null;
  onClose: () => void;
  onBuy: (a: AccountListing) => void;
}

export default function DetailModal({ account, onClose, onBuy }: DetailModalProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  if (!account) return null;

  function spinWheel() {
    setSpinning(true);
    setSpinResult(null);
    setTimeout(() => {
      const prizes = ["Voucher 5%", "Voucher 10%", "Không trúng", "Voucher 50k"];
      setSpinResult(prizes[Math.floor(Math.random() * prizes.length)]);
      setSpinning(false);
    }, 1800);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-[65] flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-3xl rounded-2xl border border-white/10 p-5 my-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-lg">{account.title}</h3>
            <button onClick={onClose}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-3">
              <div className="rounded-xl overflow-hidden aspect-video">
                <img
                  src={account.gallery[activeImg]}
                  alt={account.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                {account.gallery.map((g, i) => (
                  <button
                    key={g}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border ${
                      i === activeImg ? "border-neonCyan" : "border-white/10"
                    }`}
                  >
                    <img src={g} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 p-3 mt-3">
                <p className="text-xs font-semibold text-neonCyan flex items-center gap-1 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Thông số kỹ thuật đầy đủ
                </p>
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-1 text-white/50">Rank</td>
                      <td className="py-1">{account.rank}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-1 text-white/50">Server</td>
                      <td className="py-1">{account.server}</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-1 text-white/50">Bảo hành</td>
                      <td className="py-1">{account.warrantyDays} ngày đổi trả</td>
                    </tr>
                    {Object.entries(account.specs).map(([k, v]) => (
                      <tr key={k} className="border-b border-white/5">
                        <td className="py-1 text-white/50">{k}</td>
                        <td className="py-1">{v}</td>
                      </tr>
                    ))}
                    {account.rareItems.length > 0 && (
                      <tr>
                        <td className="py-1 text-white/50">Vật phẩm hiếm</td>
                        <td className="py-1">{account.rareItems.join(", ")}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar: order form + minigame */}
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 p-3">
                {account.discountPercent > 0 && (
                  <p className="text-xs text-white/40 line-through">
                    {formatVND(account.priceOriginal)}
                  </p>
                )}
                <p className="text-gold font-display text-2xl font-bold">
                  {formatVND(account.priceSale)}
                </p>
                <button
                  onClick={() => onBuy(account)}
                  className="mt-3 w-full rounded-full bg-gradient-to-r from-neonCyan to-electricViolet py-2 text-sm font-semibold text-obsidian"
                >
                  Đặt Mua Ngay
                </button>
              </div>

              <div className="rounded-xl border border-white/10 p-3 text-center">
                <p className="text-xs font-semibold flex items-center justify-center gap-1 mb-2">
                  <Gift className="w-3.5 h-3.5 text-gold" /> Vòng Quay May Mắn
                </p>
                <motion.div
                  animate={spinning ? { rotate: 1080 } : { rotate: 0 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="w-24 h-24 mx-auto rounded-full border-4 border-dashed border-neonCyan/50 flex items-center justify-center"
                >
                  <Gift className="w-8 h-8 text-neonCyan" />
                </motion.div>
                <button
                  onClick={spinWheel}
                  disabled={spinning}
                  className="mt-2 w-full rounded-full border border-white/15 py-1.5 text-xs disabled:opacity-50"
                >
                  {spinning ? "Đang quay..." : "Quay Ngay"}
                </button>
                {spinResult && (
                  <p className="text-[11px] text-neonCyan mt-2">Bạn nhận được: {spinResult}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
