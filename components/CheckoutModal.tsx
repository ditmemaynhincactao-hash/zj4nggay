"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Copy, CheckCircle2, Ticket, LifeBuoy } from "lucide-react";
import { AccountListing } from "@/lib/types";
import { VOUCHERS } from "@/lib/mockData";

function formatVND(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

interface CheckoutModalProps {
  account: AccountListing | null;
  onClose: () => void;
}

type Stage = "review" | "paying" | "delivered";

export default function CheckoutModal({ account, onClose }: CheckoutModalProps) {
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [stage, setStage] = useState<Stage>("review");
  const [copied, setCopied] = useState(false);

  if (!account) return null;

  const finalPrice = Math.round(account.priceSale * (1 - appliedDiscount / 100));

  function applyVoucher() {
    const v = VOUCHERS.find((x) => x.code.toLowerCase() === voucherCode.trim().toLowerCase());
    if (v && account && account.priceSale >= v.minOrder) {
      setAppliedDiscount(v.discountPercent);
    } else {
      setAppliedDiscount(0);
    }
  }

  function payNow() {
    setStage("paying");
    // Simulated webhook/QR auto-confirm within 3s
    setTimeout(() => setStage("delivered"), 3000);
  }

  function copyCreds() {
navigator.clipboard?.writeText(`user_${account!.id} / pass_${account!.id} / 2FA_492113`);

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/75 z-[70] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-md rounded-2xl border border-white/10 p-5"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-lg">Đặt Mua Tài Khoản</h3>
            <button onClick={onClose}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {stage === "review" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <img
                  src={account.images[0]}
                  className="w-20 h-20 rounded-lg object-cover"
                  alt={account.title}
                />
                <div>
                  <p className="text-sm font-semibold">{account.title}</p>
                  <p className="text-xs text-white/50">Mã: {account.id}</p>
                  <p className="text-gold font-display text-xl font-bold mt-1">
                    {formatVND(finalPrice)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Nhập mã voucher"
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-3 py-2 text-xs outline-none focus:border-neonCyan/60"
                  />
                </div>
                <button
                  onClick={applyVoucher}
                  className="rounded-full border border-white/15 px-3 text-xs"
                >
                  Áp dụng
                </button>
              </div>
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-neonCyan">
                  Đã áp dụng giảm thêm {appliedDiscount}%
                </p>
              )}

              <button
                onClick={payNow}
                className="w-full rounded-full bg-gradient-to-r from-neonCyan to-electricViolet py-2.5 text-sm font-semibold text-obsidian"
              >
                Thanh Toán {formatVND(finalPrice)}
              </button>
            </div>
          )}

          {stage === "paying" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="bg-white rounded-xl p-4">
                <QrCode className="w-32 h-32 text-black" />
              </div>
              <p className="text-xs text-white/60 text-center">
                Quét mã để thanh toán {formatVND(finalPrice)}.
                <br />
                Hệ thống tự động xác nhận giao dịch...
              </p>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="h-full bg-neonCyan"
                />
              </div>
            </div>
          )}

          {stage === "delivered" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neonCyan">
                <CheckCircle2 className="w-5 h-5" />
                <p className="text-sm font-semibold">Giao dịch thành công!</p>
              </div>
              <div className="rounded-xl border border-white/10 p-3 space-y-1 text-xs font-mono">
                <p>Tài khoản: user_{account.id}</p>
                <p>Mật khẩu: pass_{account.id}</p>
                <p>Mã 2FA: 492113</p>
                <p className="text-white/50">Thông tin cũng đã được gửi tới Email/SMS của bạn.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyCreds}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-white/15 py-2 text-xs"
                >
                  <Copy className="w-3.5 h-3.5" /> {copied ? "Đã sao chép" : "Sao Chép"}
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-white/15 py-2 text-xs">
                  <LifeBuoy className="w-3.5 h-3.5" /> Yêu Cầu Bảo Hành
                </button>
              </div>
              <p className="text-[11px] text-white/40 text-center">
                Bảo hành đổi trả trong {account.warrantyDays} ngày kể từ lúc nhận acc.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
