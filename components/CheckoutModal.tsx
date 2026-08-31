"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, CheckCircle2, Ticket, LifeBuoy } from "lucide-react";
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

  const orderCode = useMemo(() => {
    if (!account) return "";
    return `DH${account.id}${Date.now().toString().slice(-4)}`;
  }, [account]);

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

  function goToPayment() {
    setStage("paying");
  }

  function confirmTransferred() {
    setStage("delivered");
  }

  function copyOrderCode() {
    navigator.clipboard?.writeText(orderCode);
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
          className="glass-panel w-full max-w-md rounded-2xl border border-white/10 p-5 max-h-[90vh] overflow-y-auto"
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
                onClick={goToPayment}
                className="w-full rounded-full bg-gradient-to-r from-neonCyan to-electricViolet py-2.5 text-sm font-semibold text-obsidian"
              >
                Thanh Toán {formatVND(finalPrice)}
              </button>
            </div>
          )}

          {stage === "paying" && (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="bg-white rounded-xl p-2">
                <img
                  src="/att.Dgy_DF5Ug-GxwLqKGDlCM_2lV1dzwiYhgZ6Z7mSqf3U.jpeg"
                  alt="QR nhận tiền"
                  className="w-52 h-auto rounded-lg"
                />
              </div>

              <p className="text-gold font-display text-xl font-bold">
                {formatVND(finalPrice)}
              </p>

              <div className="w-full rounded-xl border border-white/10 p-3 text-center space-y-1">
                <p className="text-[11px] text-white/50">Mã đơn hàng (ghi vào nội dung CK)</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm font-mono font-semibold text-neonCyan">{orderCode}</p>
                  <button onClick={copyOrderCode}>
                    <Copy className="w-3.5 h-3.5 text-white/60" />
                  </button>
                </div>
                {copied && <p className="text-[10px] text-neonCyan">Đã sao chép</p>}
              </div>

              <p className="text-[11px] text-white/50 text-center px-2">
                Quét mã QR bằng app ngân hàng hoặc ví điện tử, chuyển đúng số tiền và ghi mã đơn hàng vào nội dung.
                Sau khi chuyển khoản, bấm nút bên dưới — chúng tôi sẽ xác nhận và bàn giao tài khoản trong ít phút.
              </p>

              <button
                onClick={confirmTransferred}
                className="w-full rounded-full bg-gradient-to-r from-neonCyan to-electricViolet py-2.5 text-sm font-semibold text-obsidian"
              >
                Tôi Đã Chuyển Khoản
              </button>
            </div>
          )}

          {stage === "delivered" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-neonCyan">
                <CheckCircle2 className="w-5 h-5" />
                <p className="text-sm font-semibold">Đã ghi nhận yêu cầu thanh toán!</p>
              </div>
              <div className="rounded-xl border border-white/10 p-3 space-y-1 text-xs">
                <p>Mã đơn hàng: <span className="font-mono text-neonCyan">{orderCode}</span></p>
                <p className="text-white/50">
                  Chúng tôi sẽ kiểm tra giao dịch và gửi thông tin tài khoản qua Zalo/Email/SMS
                  bạn đã đăng ký trong vòng vài phút đến 1 giờ.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-white/15 py-2 text-xs">
                  <LifeBuoy className="w-3.5 h-3.5" /> Liên Hệ Hỗ Trợ
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
