# VIPACC — Chợ Tài Khoản Game Siêu VIP

## Cài đặt
```
npm install
npm run dev
```
Mở http://localhost:3000

## Cấu trúc
- app/page.tsx — trang chính, ghép các module
- app/layout.tsx, app/globals.css — layout & design tokens
- components/Header.tsx — search, nạp tiền, giỏ hàng
- components/HeroSection.tsx — banner, live ticker, stats counter
- components/FilterPanel.tsx — bộ lọc game/giá/rank
- components/AccountCard.tsx — thẻ tài khoản + skeleton loading
- components/DetailModal.tsx — chi tiết acc, gallery, vòng quay may mắn
- components/CheckoutModal.tsx — thanh toán QR, voucher, giao thông tin acc
- lib/types.ts, lib/mockData.ts — kiểu dữ liệu & dữ liệu mẫu
- tailwind.config.ts — bảng màu, animation cyberpunk

## Lưu ý production
Đây là bộ khung frontend với mock data. Để triển khai thật cần:
- Nối Prisma/PostgreSQL hoặc Supabase thay cho lib/mockData.ts
- Thay QR giả trong CheckoutModal bằng cổng thanh toán thật (MoMo/VNPay/ngân hàng) có xác thực webhook phía server
- Không bao giờ trả mật khẩu/2FA thật qua client không mã hoá — cần luồng bàn giao tài khoản an toàn phía backend
- Tuân thủ điều khoản dịch vụ của từng game trước khi vận hành mô hình mua bán tài khoản
