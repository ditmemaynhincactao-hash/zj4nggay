// lib/types.ts

export type GameSlug = "genshin" | "freefire" | "lienquan" | "valorant";

export type Rarity = "thuong" | "vip" | "sieure" | "docnhat";

export interface GameInfo {
  slug: GameSlug;
  name: string;
  icon: string; // lucide icon name reference, resolved in component
  accentColor: string;
  accountCount: number;
}

export interface AccountListing {
  id: string;
  game: GameSlug;
  title: string;
  images: string[]; // carousel thumbnails
  rarity: Rarity;
  rank: string;
  server: string;
  level: number;
  championCount?: number; // Liên Quân / Valorant style
  skinCount?: number;
  vipLevel?: number;
  registeredEmail: boolean;
  registeredPhone: boolean;
  registeredFacebook: boolean;
  infoVerified: boolean; // "cam kết thông tin 100%"
  warrantyDays: number;
  priceOriginal: number; // VND
  priceSale: number; // VND
  discountPercent: number;
  createdAt: string; // ISO date
  rareItems: string[]; // named rare skins/weapons/heroes
  gallery: string[]; // detail page HD images
  specs: Record<string, string>;
}

export interface Voucher {
  code: string;
  label: string;
  discountPercent: number;
  minOrder: number;
  expiresAt: string;
}

export interface Order {
  id: string;
  accountId: string;
  buyerName: string;
  amountPaid: number;
  status: "pending" | "paid" | "delivered" | "warranty_requested";
  createdAt: string;
  deliveredCredentials?: {
    username: string;
    password: string;
    twoFactorCode?: string;
    email?: string;
  };
}

export interface FilterState {
  game: GameSlug | "all";
  priceRange: [number, number];
  registeredEmail: boolean | null;
  registeredPhone: boolean | null;
  registeredFacebook: boolean | null;
  rank: string | "all";
  sortBy: "price_asc" | "price_desc" | "newest" | "discount";
  rareItemsOnly: boolean;
}

export interface LiveTickerEvent {
  id: string;
  maskedUser: string;
  action: "purchase" | "topup";
  amount: number;
  accountId?: string;
  timestamp: string;
}
