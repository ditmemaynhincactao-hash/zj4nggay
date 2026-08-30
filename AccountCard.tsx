"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShieldCheck, Zap } from "lucide-react";
import { AccountListing } from "@/lib/types";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

const RARITY_LABEL: Record<AccountListing["rarity"], string> = {
  thuong: "Thường",
  vip: "VIP",
  sieure: "Siêu Rẻ",
  docnhat: "Độc Nhất",
};

interface AccountCardProps {
  account: AccountListing;
  onViewDetail: (a: AccountListing) => void;
  onQuickBuy: (a: AccountListing) => void;
}

export default function AccountCard({ account, onViewDetail, onQuickBuy }: AccountCardProps) {
  const [imgIndex, setImgIndex] = useState(0);

  function cycle(dir: 1 | -1) {
    setImgIndex((i) => (i + dir + account.images.length) % account.images.length);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`glow-border glass-panel rounded-2xl overflow-hidden border ${
        "rarity-" + account.rarity
      } flex flex-col`}
    >
      <div className="relative aspect-video group">
        <img
          src={account.images[imgIndex]}
          alt={account.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold border bg-black/50 rarity-${account.rarity}`}
        >
          {RARITY_LABEL[account.rarity]}
        </div>
        {account.discountPercent > 0 && (
          <div className="absolute top-2 right-2 rounded-full bg-crimson text-white text-[10px] font-bold px-2 py-0.5">
            -{account.discountPercent}%
          </div>
        )}
        {account.images.length > 1 && (
          <>
            <button
              onClick={() => cycle(-1)}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => cycle(1)}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1">
              {account.images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === imgIndex ? "bg-neonCyan" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-sm font-semibold line-clamp-1">{account.title}</h3>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/60">
          <span>Rank: {account.rank}</span>
          {account.championCount && <span>{account.championCount} tướng</span>}
          {account.skinCount && <span>{account.skinCount} skin</span>}
          {account.vipLevel && <span>VIP {account.vipLevel}</span>}
          {account.infoVerified && (
            <span className="flex items-center gap-1 text-neonCyan">
              <ShieldCheck className="w-3 h-3" /> Đã xác minh
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            {account.discountPercent > 0 && (
              <p className="text-[11px] text-white/40 line-through">
                {formatVND(account.priceOriginal)}
              </p>
            )}
            <p className="text-gold font-display text-lg font-bold">
              {formatVND(account.priceSale)}
            </p>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => onViewDetail(account)}
              className="glow-border rounded-full border border-white/15 px-2.5 py-1.5 text-[11px]"
            >
              Xem Chi Tiết
            </button>
            <button
              onClick={() => onQuickBuy(account)}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-neonCyan to-electricViolet px-2.5 py-1.5 text-[11px] font-semibold text-obsidian"
            >
              <Zap className="w-3 h-3" /> Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AccountCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <div className="aspect-video skeleton-shimmer" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 rounded skeleton-shimmer" />
        <div className="h-3 w-1/2 rounded skeleton-shimmer" />
        <div className="h-6 w-2/3 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}
