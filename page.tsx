"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterPanel from "@/components/FilterPanel";
import AccountCard, { AccountCardSkeleton } from "@/components/AccountCard";
import DetailModal from "@/components/DetailModal";
import CheckoutModal from "@/components/CheckoutModal";
import { ACCOUNTS } from "@/lib/mockData";
import { AccountListing, FilterState } from "@/lib/types";

const DEFAULT_FILTERS: FilterState = {
  game: "all",
  priceRange: [0, 10_000_000],
  registeredEmail: null,
  registeredPhone: null,
  registeredFacebook: null,
  rank: "all",
  sortBy: "newest",
  rareItemsOnly: false,
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);
  const [detailAccount, setDetailAccount] = useState<AccountListing | null>(null);
  const [checkoutAccount, setCheckoutAccount] = useState<AccountListing | null>(null);

  const filteredAccounts = useMemo(() => {
    let list = [...ACCOUNTS];

    if (filters.game !== "all") list = list.filter((a) => a.game === filters.game);
    list = list.filter((a) => a.priceSale <= filters.priceRange[1]);
    if (filters.registeredEmail) list = list.filter((a) => a.registeredEmail);
    if (filters.registeredPhone) list = list.filter((a) => a.registeredPhone);
    if (filters.registeredFacebook) list = list.filter((a) => a.registeredFacebook);
    if (filters.rank !== "all") list = list.filter((a) => a.rank === filters.rank);
    if (filters.rareItemsOnly) list = list.filter((a) => a.rareItems.length > 0);

    switch (filters.sortBy) {
      case "price_asc":
        list.sort((a, b) => a.priceSale - b.priceSale);
        break;
      case "price_desc":
        list.sort((a, b) => b.priceSale - a.priceSale);
        break;
      case "discount":
        list.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return list;
  }, [filters]);

  function handleFilterChange(next: FilterState) {
    setLoading(true);
    setFilters(next);
    setTimeout(() => setLoading(false), 400);
  }

  return (
    <main className="min-h-screen pb-20">
      <Header />

      <div className="max-w-7xl mx-auto px-4">
        <HeroSection />

        <div className="mt-8">
          <FilterPanel filters={filters} onChange={handleFilterChange} />
        </div>

        <div className="flex items-center justify-between mt-6 mb-3">
          <h2 className="font-display text-xl font-semibold">
            {filteredAccounts.length} Tài Khoản Khả Dụng
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <AccountCardSkeleton key={i} />)
            : filteredAccounts.map((a) => (
                <AccountCard
                  key={a.id}
                  account={a}
                  onViewDetail={setDetailAccount}
                  onQuickBuy={setCheckoutAccount}
                />
              ))}

          {!loading && filteredAccounts.length === 0 && (
            <p className="col-span-full text-center text-white/50 py-10 text-sm">
              Không tìm thấy tài khoản phù hợp với bộ lọc hiện tại.
            </p>
          )}
        </div>
      </div>

      <DetailModal
        account={detailAccount}
        onClose={() => setDetailAccount(null)}
        onBuy={(a) => {
          setDetailAccount(null);
          setCheckoutAccount(a);
        }}
      />
      <CheckoutModal account={checkoutAccount} onClose={() => setCheckoutAccount(null)} />
    </main>
  );
}
