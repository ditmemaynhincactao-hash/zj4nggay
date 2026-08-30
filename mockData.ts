// lib/mockData.ts
import { AccountListing, GameInfo, LiveTickerEvent, Order, Voucher } from "./types";

export const GAMES: GameInfo[] = [
  { slug: "genshin", name: "Genshin Impact", icon: "Sparkles", accentColor: "#00F0FF", accountCount: 128 },
  { slug: "freefire", name: "Free Fire", icon: "Flame", accentColor: "#FF0055", accountCount: 214 },
  { slug: "lienquan", name: "Liên Quân Mobile", icon: "Swords", accentColor: "#7000FF", accountCount: 176 },
  { slug: "valorant", name: "Valorant", icon: "Crosshair", accentColor: "#FFD700", accountCount: 93 },
];

function id(prefix: string, n: number) {
  return `${prefix}-${String(n).padStart(5, "0")}`;
}

function makeAccount(
  n: number,
  game: AccountListing["game"],
  overrides: Partial<AccountListing>
): AccountListing {
  const priceOriginal = overrides.priceOriginal ?? 500000;
  const discountPercent = overrides.discountPercent ?? 20;
  const priceSale = Math.round(priceOriginal * (1 - discountPercent / 100));
  return {
    id: id(game, n),
    game,
    title: overrides.title ?? `${game.toUpperCase()} Account #${n}`,
    images: overrides.images ?? [
      `https://picsum.photos/seed/${game}${n}a/480/320`,
      `https://picsum.photos/seed/${game}${n}b/480/320`,
      `https://picsum.photos/seed/${game}${n}c/480/320`,
    ],
    rarity: overrides.rarity ?? "thuong",
    rank: overrides.rank ?? "Vàng",
    server: overrides.server ?? "SEA",
    level: overrides.level ?? 40,
    championCount: overrides.championCount,
    skinCount: overrides.skinCount,
    vipLevel: overrides.vipLevel,
    registeredEmail: overrides.registeredEmail ?? true,
    registeredPhone: overrides.registeredPhone ?? false,
    registeredFacebook: overrides.registeredFacebook ?? true,
    infoVerified: overrides.infoVerified ?? true,
    warrantyDays: overrides.warrantyDays ?? 7,
    priceOriginal,
    discountPercent,
    priceSale,
    createdAt: overrides.createdAt ?? new Date(Date.now() - n * 3600_000).toISOString(),
    rareItems: overrides.rareItems ?? [],
    gallery:
      overrides.gallery ??
      overrides.images ?? [
        `https://picsum.photos/seed/${game}${n}detail1/1280/720`,
        `https://picsum.photos/seed/${game}${n}detail2/1280/720`,
      ],
    specs: overrides.specs ?? {},
  };
}

export const ACCOUNTS: AccountListing[] = [
  makeAccount(1, "genshin", {
    title: "Genshin AR58 - Full 5 Sao Thủy",
    rarity: "docnhat",
    rank: "AR 58",
    server: "Asia",
    level: 58,
    skinCount: 12,
    priceOriginal: 4500000,
    discountPercent: 15,
    rareItems: ["Zhongli", "Furina", "Raiden Shogun", "Nahida"],
    specs: { "Nguyên thạch còn": "32,000", "Nét vẽ": "Toàn bộ 5 sao Thủy" },
  }),
  makeAccount(2, "genshin", {
    title: "Genshin AR45 - Vừa Túi Tiền",
    rarity: "thuong",
    rank: "AR 45",
    level: 45,
    priceOriginal: 350000,
    discountPercent: 10,
    rareItems: ["Xiangling"],
  }),
  makeAccount(3, "genshin", {
    title: "Genshin AR60 - Siêu VIP Full Ngũ Tinh",
    rarity: "vip",
    rank: "AR 60",
    level: 60,
    priceOriginal: 8000000,
    discountPercent: 25,
    rareItems: ["Zhongli", "Hu Tao", "Ganyu", "Ayaka", "Klee", "Itto"],
  }),
  makeAccount(4, "freefire", {
    title: "Free Fire VIP 12 - Full Skin Súng Huyền Thoại",
    rarity: "vip",
    rank: "Heroic",
    vipLevel: 12,
    priceOriginal: 1200000,
    discountPercent: 30,
    rareItems: ["AK Kraken", "M4A1 Cyber Wolf"],
  }),
  makeAccount(5, "freefire", {
    title: "Free Fire Giá Rẻ - Đủ Rank Kim Cương",
    rarity: "sieure",
    rank: "Kim Cương",
    priceOriginal: 90000,
    discountPercent: 40,
  }),
  makeAccount(6, "lienquan", {
    title: "Liên Quân Cao Thủ - 45 Tướng 80 Trang Phục",
    rarity: "vip",
    rank: "Cao Thủ",
    championCount: 45,
    skinCount: 80,
    priceOriginal: 2200000,
    discountPercent: 20,
    rareItems: ["Zata Vô Cực Chiến Giáp", "Butterfly Cyber"],
  }),
  makeAccount(7, "lienquan", {
    title: "Liên Quân Bạch Kim - Fresh Tài Khoản",
    rarity: "thuong",
    rank: "Bạch Kim",
    championCount: 20,
    skinCount: 5,
    priceOriginal: 150000,
    discountPercent: 5,
  }),
  makeAccount(8, "valorant", {
    title: "Valorant Immortal - Full Skin Vandal Elderflame",
    rarity: "docnhat",
    rank: "Immortal",
    priceOriginal: 3500000,
    discountPercent: 18,
    rareItems: ["Elderflame Vandal", "Prime/2.0 Phantom", "Reaver Knife"],
  }),
  makeAccount(9, "valorant", {
    title: "Valorant Gold - Nhiều Agent Mở Khoá",
    rarity: "thuong",
    rank: "Gold",
    priceOriginal: 220000,
    discountPercent: 12,
  }),
  makeAccount(10, "freefire", {
    title: "Free Fire OB Cổ - Rare Avatar 2019",
    rarity: "docnhat",
    rank: "Grandmaster",
    priceOriginal: 6000000,
    discountPercent: 10,
    rareItems: ["Avatar 2019 Booyah Day"],
  }),
];

export const VOUCHERS: Voucher[] = [
  { code: "VIPNEW10", label: "Giảm 10% cho đơn đầu tiên", discountPercent: 10, minOrder: 100000, expiresAt: "2026-12-31" },
  { code: "GAMER50K", label: "Giảm thêm cho đơn từ 1 triệu", discountPercent: 5, minOrder: 1000000, expiresAt: "2026-10-31" },
];

export const ORDERS: Order[] = [
  {
    id: "ORD-90001",
    accountId: "genshin-00002",
    buyerName: "Nguyễn V.A",
    amountPaid: 315000,
    status: "delivered",
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    deliveredCredentials: {
      username: "gi_user_0002",
      password: "••••••••",
      twoFactorCode: "482913",
      email: "acc0002@example.com",
    },
  },
];

export const LIVE_TICKER: LiveTickerEvent[] = [
  { id: "t1", maskedUser: "User***89", action: "purchase", amount: 500000, accountId: "genshin-00003", timestamp: new Date().toISOString() },
  { id: "t2", maskedUser: "Khang***", action: "topup", amount: 200000, timestamp: new Date().toISOString() },
  { id: "t3", maskedUser: "Player***21", action: "purchase", amount: 1200000, accountId: "freefire-00004", timestamp: new Date().toISOString() },
];

export const STATS = {
  totalOrders: 48213,
  totalCustomers: 15920,
  totalAccountsSold: 39104,
};
