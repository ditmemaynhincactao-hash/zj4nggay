"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Wallet,
  ShoppingCart,
  Bell,
  User,
  QrCode,
  Landmark,
  CreditCard,
  X,
} from "lucide-react";
import { ACCOUNTS } from "@/lib/mockData";
import { AccountListing } from "@/lib/types";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function Header() {
  const [query, setQuery] = useState("");
  const [showTopup, setShowTopup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [topupMethod, setTopupMethod] = useState<"momo" | "bank" | "card">("momo");

  const suggestions: AccountListing[] =
    query.trim().length > 0
      ? ACCOUNTS.filter(
          (a) =>
            a.title.toLowerCase().includes(query.toLowerCase()) ||
            a.id.toLowerCase().includes(query.toLowerCase()) ||
            a.game.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
      : [];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <div className="flex flex-col leading-none shrink-0">
          <span className="font-display text-2xl font-bold text-neonCyan animate-glow rounded px-1">
            VIP<span className="text-crimson">ACC</span>
          </span>
          <span className="text-[10px] tracking-widest text-white/50">
            UY TÍN · TỰ ĐỘNG 100%
          </span>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xl hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo ID, tên game, mức giá..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-neonCyan/60 focus:shadow-glowCyan transition"
          />
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute mt-2 w-full glass-panel rounded-xl overflow-hidden border border-white/10 z-50"
              >
                {suggestions.map((s) => (
                  <li
                    key={s.id}
                    className="px-4 py-2 text-sm hover:bg-white/10 cursor-pointer flex justify-between"
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="text-neonCyan shrink-0 ml-2">
                      {formatVND(s.priceSale)}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setShowTopup(true)}
            className="glow-border flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-xs bg-white/5"
          >
            <Wallet className="w-4 h-4 text-gold" />
            <span className="hidden md:inline">Nạp tiền</span>
          </button>

          <button className="relative rounded-full p-2 border border-white/10 bg-white/5">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-crimson" />
          </button>

          <button
            onClick={() => setShowCart(true)}
            className="relative rounded-full p-2 border border-white/10 bg-white/5"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 text-[10px] bg-electricViolet rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </button>

          <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-2 pr-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neonCyan to-electricViolet flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="hidden md:flex flex-col items-start leading-none">
              <span className="text-xs">Số dư</span>
              <span className="text-xs text-gold font-semibold">1.250.000đ</span>
            </span>
          </button>
        </div>
      </div>

      {/* Topup modal */}
      <AnimatePresence>
        {showTopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
            onClick={() => setShowTopup(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-2xl w-full max-w-sm p-5 border border-white/10"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-lg">Nạp Tiền Nhanh</h3>
                <button onClick={() => setShowTopup(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                {[
                  { key: "momo", label: "MoMo", icon: QrCode },
                  { key: "bank", label: "Banking QR", icon: Landmark },
                  { key: "card", label: "Thẻ Cào", icon: CreditCard },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setTopupMethod(key as typeof topupMethod)}
                    className={`flex-1 flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-xs transition ${
                      topupMethod === key
                        ? "border-neonCyan text-neonCyan shadow-glowCyan"
                        : "border-white/10 text-white/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {topupMethod !== "card" ? (
                <div className="bg-white rounded-xl aspect-square flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-black" />
                </div>
              ) : (
                <div className="space-y-2">
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
                    <option>Viettel</option>
                    <option>Mobifone</option>
                    <option>Vinaphone</option>
                  </select>
                  <input
                    placeholder="Nhập mã thẻ"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
                  />
                  <input
                    placeholder="Nhập serial"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              )}

              <button className="mt-4 w-full rounded-full bg-neonCyan text-obsidian font-semibold py-2 text-sm shadow-glowCyan">
                Xác Nhận Nạp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart quick-view */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[60] flex justify-end"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel h-full w-full max-w-sm p-5 border-l border-white/10"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display text-lg">Giỏ Hàng</h3>
                <button onClick={() => setShowCart(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ul className="space-y-3">
                {ACCOUNTS.slice(0, 2).map((a) => (
                  <li
                    key={a.id}
                    className="flex gap-3 border border-white/10 rounded-xl p-2"
                  >
                    <img
                      src={a.images[0]}
                      className="w-16 h-16 rounded-lg object-cover"
                      alt={a.title}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{a.title}</p>
                      <p className="text-gold text-sm">{formatVND(a.priceSale)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full rounded-full bg-gradient-to-r from-neonCyan to-electricViolet py-2 text-sm font-semibold">
                Thanh Toán Ngay
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
